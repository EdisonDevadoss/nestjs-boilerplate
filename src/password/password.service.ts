import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { PasswordResetDto } from './dto';

@Injectable()
export class PasswordService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  async sendResetPasswordInstruction(email: string) {
    const user = await this.getByEmail(email);
    const resetToken = await this.authService.getResetToken(
      Number(user.id),
      user.email,
    );
    await this.mailService.sendResetPasswordLink(user, resetToken);
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async resetPassword(userId: number, dto: PasswordResetDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    const confirmedAt = user.confirmed_at || new Date();
    await this.prisma.user.update({
      where: { id: user.id },
      data: { confirmed_at: confirmedAt, hash, access_token: null },
    });
    delete user.hash;
    const updatedUser = {
      ...user,
      id: Number(user.id),
    };
    return updatedUser;
  }
}

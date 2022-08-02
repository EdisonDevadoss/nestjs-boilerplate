import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

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
}

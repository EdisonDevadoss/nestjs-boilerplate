import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthDto } from './dto';
import { JwtPayload } from './interfaces';
import { TOKEN_TYPE, RESET_TOKEN_EXPIRES } from '../common/configs/constants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatched = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatched) {
      throw new ForbiddenException('Access Denied');
    }
    const userId = Number(user.id);
    const token = await this.getToken(userId, user.email);
    await this.updateToken(token, userId);
    delete user.hash;
    delete user.access_token;
    return {
      ...user,
      token,
      id: Number(user.id),
    };
  }

  async getToken(userId: number, email: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return accessToken;
  }

  async getResetToken(userId: number, email: string) {
    const resetToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
        type: TOKEN_TYPE.resetPassword,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: RESET_TOKEN_EXPIRES,
      },
    );
    return resetToken;
  }

  async updateToken(token: string, userId: number) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        access_token: token,
      },
    });
  }

  async logout(userPayload: JwtPayload) {
    return await this.prisma.user.update({
      where: {
        id: userPayload.sub,
      },
      data: {
        access_token: null,
      },
    });
  }
}

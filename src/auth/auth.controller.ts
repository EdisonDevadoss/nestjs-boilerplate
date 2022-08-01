import { Body, Controller, Delete, Post, Response } from '@nestjs/common';
import { Response as Res } from 'express';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GetCurrentUser, Public } from '../common/decorators';
import { JwtPayload } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signin(@Body() dto: AuthDto, @Response() reply: Res) {
    return this.authService
      .signin(dto)
      .then((user) => {
        return reply
          .set({ Authorization: `Bearer ${user.token}` })
          .json({ ...user });
      })
      .catch((error) => {
        return reply.json(error);
      });
  }

  @Delete('logout')
  logout(@GetCurrentUser() user: JwtPayload, @Response() reply: Res) {
    this.authService
      .logout(user)
      .then(() => {
        return reply.json({ message: 'Successfully logged out' });
      })
      .catch(() => {
        return reply.json({ message: 'Successfully logged out' });
      });
  }
}

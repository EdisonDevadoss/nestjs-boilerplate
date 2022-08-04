import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ResetPasswordGuard extends AuthGuard('reset-password-jwt') {
  constructor() {
    super();
  }

  // ToDo Fix type
  handleRequest(err: any, user: any, info: string) {
    if (err || !user) {
      if (info === 'jwt expired') {
        throw new UnauthorizedException('Access token has been expired');
      }
      throw new UnauthorizedException('Invalid access token');
    }
    return user;
  }
}

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
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

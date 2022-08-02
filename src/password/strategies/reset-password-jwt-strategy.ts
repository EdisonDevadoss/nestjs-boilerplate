import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RESET_TOKEN_EXPIRES } from '../../common/configs/constants';

@Injectable()
export class ResetPasswordJwtStrategy extends PassportStrategy(
  Strategy,
  'reset-password-jwt',
) {
  constructor() {
    console.log('process.env.JWT_SECRET is', process.env.JWT_SECRET);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // ToDo Valid type
  async validate(payload: any) {
    console.log('payload is', payload);
    if (payload.type !== RESET_TOKEN_EXPIRES) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}

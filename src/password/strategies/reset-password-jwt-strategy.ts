import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TOKEN_TYPE } from '../../common/configs/constants';

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
    if (payload.type !== TOKEN_TYPE.resetPassword) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}

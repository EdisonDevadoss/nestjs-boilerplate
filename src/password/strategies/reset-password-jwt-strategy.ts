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
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // ToDo Valid type
  async validate(payload: any) {
    if (payload.type !== TOKEN_TYPE.resetPassword) {
      throw new UnauthorizedException('Invalid access token');
    }
    return payload;
  }
}

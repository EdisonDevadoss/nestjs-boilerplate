import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ResetPasswordGuard extends AuthGuard('reset-password-jwt') {
  constructor() {
    super();
  }
}

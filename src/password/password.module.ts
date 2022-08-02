import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { ResetPasswordJwtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({}), MailModule, AuthModule],
  controllers: [PasswordController],
  providers: [PasswordService, ResetPasswordJwtStrategy],
})
export class PasswordModule {}

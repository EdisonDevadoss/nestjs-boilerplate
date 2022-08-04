import { Controller, Post, Body, Response, UseGuards } from '@nestjs/common';
import { Response as Res } from 'express';
import { Public } from '../common/decorators';
import { PasswordResetLinkDto, PasswordResetDto } from './dto';
import { ResetPasswordGuard } from './guards';
import { PasswordService } from './password.service';
import { GetCurrentUser } from '../common/decorators';

@Public()
@Controller('passwords')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @Post('send_reset_password_link')
  sendResetPasswordLink(
    @Body() dto: PasswordResetLinkDto,
    @Response() reply: Res,
  ) {
    return this.passwordService
      .sendResetPasswordInstruction(dto.email)
      .then(() => {
        return reply.json({
          message:
            'Reset password instructions have been sent to your email account',
        });
      })
      .catch(() => {
        return reply.json({
          message:
            'Reset password instructions have been sent to your email account',
        });
      });
  }

  @Post('reset')
  @UseGuards(ResetPasswordGuard)
  resetPasword(@GetCurrentUser() user: any, @Body() dto: PasswordResetDto) {
    return this.passwordService.resetPassword(user.sub, dto);
  }
}

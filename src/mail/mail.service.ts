import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // TODO set user type
  sendResetPasswordLink(user, token: string) {
    return this.mailerService.sendMail({
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Your reset password instruction',
      html: `<p>Dear ${user.name}, </p>
                  <p>You have requested a password reset for your NestJS Boilerplate account. Please <a href="${process.env.RESET_PASSWORD_URL}?reset_token=${token}">click here</a> to reset your password.</p>
                  <p>If you don't wish to reset your password, disregard this email and no action will be taken.</p>
                  <span>Regards,</span> <br /> <span>NestJS Boilerplate Team.</span>`,
    });
  }
}

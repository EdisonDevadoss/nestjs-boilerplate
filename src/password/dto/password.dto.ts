import { IsNotEmpty, IsString } from 'class-validator';
import { Match } from '../../common/validators';

export class PasswordResetLinkDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class PasswordResetDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match('password', {
    message: "Password confirmation doesn't match password",
  })
  password_confirmation: string;
}

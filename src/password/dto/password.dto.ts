import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordResetLinkDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class PasswordResetDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  password_confirmation: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  created_by: number | null;

  @ApiProperty()
  sign_in_count: number | null;

  @ApiProperty()
  last_sign_in_ip: string | null;

  @ApiProperty()
  last_sign_in_at: string | null;

  @ApiProperty()
  current_sign_in_ip: string | null;

  @ApiProperty()
  current_sign_in_at: string | null;

  @ApiProperty()
  confirmed_at: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty()
  deleted_at: string | null;

  @ApiProperty()
  token: string;
}

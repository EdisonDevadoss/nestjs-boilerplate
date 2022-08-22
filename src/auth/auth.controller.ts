import {
  Body,
  Controller,
  Delete,
  Header,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GetCurrentUser, Public } from '../common/decorators';
import { JwtPayload } from './interfaces';
import { Auth } from './entities/auth.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'user login' })
  @ApiResponse({
    status: 202,
    description: 'Login successfully',
    type: Auth,
  })
  @Header('Authorization', 'none')
  signin(@Body() dto: AuthDto, @Res() reply: Response) {
    return this.authService.signin(dto).then((user) => {
      reply.header('Authorization', `Bearer ${user.token}`);
      reply.status(HttpStatus.ACCEPTED).send(user);
    });
  }

  @Delete('logout')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'header',
    required: false,
    description: 'Authorization',
    schema: { default: 'Bearer token' },
  })
  logout(@GetCurrentUser() user: JwtPayload, @Res() reply: Response) {
    this.authService
      .logout(user)
      .then(() => {
        return reply.json({ message: 'Successfully logged out' });
      })
      .catch(() => {
        return reply.json({ message: 'Successfully logged out' });
      });
  }
}

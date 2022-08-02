import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './password/password.module';

const ENV = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${ENV}.env`,
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    PasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

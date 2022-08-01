import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AtGuard } from './common/gurads';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const reflector = new Reflector();
  app.useGlobalGuards(new AtGuard(reflector));
  await app.listen(3000);
}
bootstrap();

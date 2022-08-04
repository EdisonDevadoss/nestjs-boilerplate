import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}

  catch(exception: any, host: ArgumentsHost): void {
    const httpAdapter = this.httpAdapterHost;
    Logger.error({ error: exception }, exception.toString());
    const ctx = host.switchToHttp();

    const errorMessage = exception.response.message;
    const errorMsgs =
      typeof errorMessage === 'string' ? [errorMessage] : errorMessage;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      errors: [...errorMsgs],
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

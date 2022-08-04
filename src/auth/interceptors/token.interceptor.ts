import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const authToken = request.headers['authorization'];
    const response = context.switchToHttp().getResponse<Response>();

    response.setHeader('Authorization', authToken);

    return next.handle();
  }
}

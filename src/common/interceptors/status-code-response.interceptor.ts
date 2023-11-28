import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class StatusCodeResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data: data?.data ?? data,
        count: data?.count ?? 0 ? data.count : undefined,
        statusCode: context.switchToHttp().getResponse().statusCode,
      })),
    );
  }
}

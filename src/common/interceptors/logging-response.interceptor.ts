import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse();
                console.log(`[${request.method}] ${request.url} - Response Status Code: ${response.statusCode}`);
            }),
        );
    }
}


import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class DataValidationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        if (!req.body.email || !req.body.password) {
            throw new BadRequestException(
                'Email and Password are required',
            );
        }

        return handler
            .handle()
    }
}
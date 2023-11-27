import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { STATUS_CODES } from 'http';

import { generateMetaResponse } from '@/common/helpers';

export class ResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<object> {
    return next.handle().pipe(
      map((res) => {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();

        const data = res?.data ?? res;

        const totalCount = res?.count;

        let offset = null;
        let limit = null;
        if (
          request.query?.offset &&
          request.query?.limit &&
          Number(request.query?.limit) !== 0 &&
          totalCount
        ) {
          offset = parseInt(request.query.offset);
          limit = parseInt(request.query.limit);
        }

        // Get the status code from the response object
        const statusCode = response.statusCode;

        // Add the status name and code to the response body
        const results = {
          data,
          statusCode: statusCode,
          statusName: STATUS_CODES[statusCode],
        };

        if (offset !== null && limit !== null) {
          results['_meta'] = generateMetaResponse(offset, limit, totalCount);
        }

        return results;
      }),
    );
  }
}

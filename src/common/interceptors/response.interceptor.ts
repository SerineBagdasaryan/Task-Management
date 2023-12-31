import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { STATUS_CODES } from 'http';

import { generateMetaResponse } from '@common/helpers';

export class ResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<object> {
    return next.handle().pipe(
      map((res) => {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();

        const data = res?.data ?? res;

        const totalCount = res?.count;

        let skip = null;
        let take = null;
        if (
          request.query?.skip &&
          request.query?.take &&
          Number(request.query?.take) !== 0 &&
          totalCount
        ) {
            skip = parseInt(request.query.skip);
            take = parseInt(request.query.take);
        }

        // Get the status code from the response object
        const statusCode = response.statusCode;

        // Add the status name and code to the response body
        const results = {
          data,
          statusCode: statusCode,
          statusName: STATUS_CODES[statusCode],
        };

        if (skip !== null && take !== null) {
          results['_meta'] = generateMetaResponse(skip, take, totalCount);
        }

        return results;
      }),
    );
  }
}

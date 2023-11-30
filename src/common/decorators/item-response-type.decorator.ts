import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { STATUS_CODES } from "http";

export const ItemResponseTypeDecorator = <T>(
    model: Type<T> | Type<T>[],
    statusCode: number = HttpStatus.OK,
    statusName: string = STATUS_CODES[HttpStatus.OK],
) => {
    return applyDecorators(
        ApiResponse({
            status: statusCode,
            description: statusName,
            content: {
                'application/json': {
                    schema: Array.isArray(model)
                        ? {
                            type: 'array',
                            items: {$ref: getSchemaPath(model[0])},
                        }
                        : {$ref: getSchemaPath(model)},
                },
            },
        }),
    );
};

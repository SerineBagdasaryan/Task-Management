// import {Type} from "@nestjs/common";
// import {ApiResponse, getSchemaPath} from "@nestjs/swagger";
//
// export function ItemResponseTypeDecorator<T>(
//     classRef: Type<T>,
//     statusCode: number = 200,
//     statusName: string = 'OK',
// ) {
//     return ApiResponse({
//         status: statusCode,
//         description: statusName,
//         type: classRef,
//         schema: {
//             properties: {
//                 data: {
//                     type: 'array',
//                     items: { $ref: getSchemaPath(classRef) },
//                 },
//             },
//         },
//     });
// }
// import {applyDecorators, Type} from '@nestjs/common';
// import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
//
// export const ItemResponseTypeDecorator =<T> (
//     model: Type<T>,
//     statusCode: number = 200,
//     statusName: string = 'OK',
// ) => {
//     return applyDecorators(
//         ApiResponse({
//             status: statusCode,
//             description: statusName,
//             schema: Array.isArray(model)
//                 ? {
//                     type: 'array',
//                     items: { $ref: getSchemaPath(model[0]) },
//                 }
//                 : { $ref: getSchemaPath(model) },
//         }),
//     );
// };
import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export const ItemResponseTypeDecorator = <T>(
    model:  Type<T> | Type<T>[],
    statusCode: number = HttpStatus.OK,
    statusName: string = 'OK',
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
                            items: { $ref: getSchemaPath(model[0]) },
                        }
                        : { $ref: getSchemaPath(model) },
                },
            },
        }),
    );
};

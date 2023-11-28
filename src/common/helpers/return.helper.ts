import {HttpStatus} from '@nestjs/common';
import {
    ResponseDataDTO,
    ResponseDataPaginationDTO,
    ResponseDTO
} from '@common/dto';


export class Return {
    static ok(param?: { message?: string }): ResponseDTO {
        return {status: HttpStatus.OK, message: param?.message || 'ok'};
    }

    static returnDataPagination<T>(
        data: T,
        count?: number,
    ): ResponseDataPaginationDTO<T> {
        return {data, count};
    }

    static returnData<T>(data: T): ResponseDataDTO<T> {
        return {data, status: HttpStatus.OK};
    }
}

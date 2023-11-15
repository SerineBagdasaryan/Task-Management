import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ResponseDataPaginationDTO<T> {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  data: T;

  @ApiProperty({ required: false, type: Number, default: HttpStatus.OK })
  @IsOptional()
  status?: number;

  @ApiProperty({ required: false, type: Number, default: 100 })
  @IsOptional()
  count?: number;
}

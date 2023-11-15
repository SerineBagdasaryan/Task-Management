import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ResponseDataDTO<T> {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  data: T;

  @ApiProperty({ required: false, type: Number, default: HttpStatus.OK })
  @IsOptional()
  status?: number;
}


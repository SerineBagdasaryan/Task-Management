import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseDTO {
  @ApiProperty({ required: true, default: 'ok' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ required: true, default: HttpStatus.OK })
  @IsString()
  @IsNotEmpty()
  status: HttpStatus;
}

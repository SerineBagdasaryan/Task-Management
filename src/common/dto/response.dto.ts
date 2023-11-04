import { HttpStatus } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResponseDTO {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  status: HttpStatus;
}

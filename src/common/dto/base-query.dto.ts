import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class BaseQueryDto {
  @ApiProperty({
    type: Number,
    default: 10,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  take: number;

  @ApiProperty({
    type: Number,
    default: 0,
    required: false,
  })
  @IsNumber()
  skip: number;
}

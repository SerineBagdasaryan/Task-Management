import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class BaseQueryDto {
  @ApiProperty({
    type: Number,
    default: 10,
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  take?: number;

  @ApiProperty({
    type: Number,
    default: 0,
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  skip?: number;
}

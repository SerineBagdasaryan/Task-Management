import { ApiProperty } from '@nestjs/swagger';
import { DefaultValue } from '@common/utils/default-value';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({
    type: String,
    default: DefaultValue.lastName,
    required: true,
  })
  @IsNotEmpty({ message: 'File is required' })
  @IsString({ message: 'File must be a string' })
  imagePath: string;
}

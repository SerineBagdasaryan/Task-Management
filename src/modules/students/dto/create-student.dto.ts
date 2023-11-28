import { IsNotEmpty, IsString } from 'class-validator';
import { TitleValue } from '../utils/title-value';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    type: String,
    default: TitleValue.title,
    required: true,
  })
  @IsNotEmpty({ message: 'Name  is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    type: Array<number>,
    required: false,
  })
  readonly courseIds?: number[];
}

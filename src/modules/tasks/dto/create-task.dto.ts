import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultValue } from '@common/utils/default-value';
import { IsDateFormat } from '@Decorator/date.validator.decorator';
import { TaskStatus } from '@modules/tasks/enum/task-status.enum';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    default: DefaultValue.title,
    required: true,
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({
    type: String,
    default: DefaultValue.title,
    required: true,
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @ApiProperty({
    type: Date,
    default: '2023-11-29',
    required: true,
  })
  @IsDateString()
  @IsDateFormat('yyyy-MM-dd', {
    message: 'Date must be in the format yyyy-MM-dd.',
  })
  dueDate: string;

  @ApiProperty({
    enum: TaskStatus,
    default: TaskStatus.TODO,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

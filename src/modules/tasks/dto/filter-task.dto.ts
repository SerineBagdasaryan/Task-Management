import {BaseQueryDto} from "@Dto/base-query.dto";
import {IsDateString, IsEnum, IsOptional} from "class-validator";
import {TaskStatus} from "../enum/task-status.enum";
import {ApiProperty} from "@nestjs/swagger";


export class FilterTaskDto extends BaseQueryDto {
    @ApiProperty({
        type: Date,
        default: new Date(),
        required: false
    })
    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @ApiProperty({
        enum: TaskStatus,
        default: TaskStatus.TODO,
        required: false
    })
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

}

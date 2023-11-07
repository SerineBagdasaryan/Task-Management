import {BaseQueryDto} from "../../../common/dto/base-query.dto";
import {IsDateString, IsEnum, IsOptional} from "class-validator";
import {TaskStatus} from "../enum/task-status.enum";


export class FilterTaskDto extends BaseQueryDto {
    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

}

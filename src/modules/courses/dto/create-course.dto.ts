import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {TitleValue} from "@/modules/auth/utils/title-value";


export class CreateCourseDto {
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
     readonly studentIds?: number[];
}

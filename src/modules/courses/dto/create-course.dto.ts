import {IsNotEmpty, IsString} from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty({ message: 'Name  is required' })
    @IsString({ message: 'Name must be a string' })
     name: string;

     studentIds?: number[];
}

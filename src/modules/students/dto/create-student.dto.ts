import {IsNotEmpty, IsString} from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty({ message: 'Name  is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    readonly courseIds?: number[];
}
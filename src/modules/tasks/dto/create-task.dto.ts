import {IsDateString, IsNotEmpty, IsString} from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Description is required' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Due Date is required' })
    @IsDateString()
    dueDate: Date;

}

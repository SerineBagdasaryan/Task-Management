import {IsInt, Min} from "class-validator";

export class ParamDto {
    @IsInt({ message: 'Id must be an integer' })
    @Min(1, { message: 'Id must be greater than or equal to 1' })
    id: number;
}

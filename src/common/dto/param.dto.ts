import {IsNumber} from "class-validator";

export class ParamDto {
    @IsNumber()
    id: number;
}

import { IsNumberString, IsOptional } from 'class-validator';
export class BaseQueryDto {
    @IsNumberString()
    @IsOptional()
    take?: number;

    @IsNumberString()
    @IsOptional()
    skip?: number;
}

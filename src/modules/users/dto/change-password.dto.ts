import { ApiProperty } from "@nestjs/swagger";
import { DefaultValue } from "@common/utils/default-value";
import {IsNotEmpty, IsString, Length, Matches} from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({
        type: String,
        default: DefaultValue.password,
        required: true,
    })
    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string'})
    @Length(8, 20, {
        message: 'Password length must be between 8 and 20 characters',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[a-zA-Z\d!@#$%]{8,}$/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the symbols !, @, #, $, %',
    })
    newPassword: string;

}
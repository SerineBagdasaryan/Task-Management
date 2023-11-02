import {IsString, IsNotEmpty, IsEmail, Length} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Username is required' })
    @IsString({ message: 'Username must be a string' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @Length(8, 20, { message: 'Password length must be between 8 and 20 characters' })
    password: string;

    @IsNotEmpty({ message: 'FirstName  is required' })
    @IsString({ message: 'FirstName must be a string' })
    firstName: string;

    @IsNotEmpty({ message: 'LastName is required' })
    @IsString({ message: 'LastName must be a string' })
    lastName: string;
}

import {IsString, IsNotEmpty, IsEmail, Length, MaxLength, MinLength, Matches} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultValue } from '@common/utils/default-value';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    default: DefaultValue.email,
    required: true,
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    type: String,
    default: DefaultValue.password,
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 20, {
    message: 'Password length must be between 8 and 20 characters',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[a-zA-Z\d!@#$%]{8,}$/, {
    message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the symbols !, @, #, $, %',
  })
  password: string;

  @ApiProperty({
    type: String,
    default: DefaultValue.firstName,
    required: true,
  })
  @MinLength(3, { message: 'First name is too short' })
  @MaxLength(30, { message: 'First name is too long' })
  @IsNotEmpty({ message: 'FirstName  is required' })
  @IsString({ message: 'FirstName must be a string' })
  firstName: string;

  @ApiProperty({
    type: String,
    default: DefaultValue.lastName,
    required: true,
  })
  @MinLength(3, { message: 'Last name is too short' })
  @MaxLength(50, { message: 'Last name is too long' })
  @IsNotEmpty({ message: 'LastName is required' })
  @IsString({ message: 'LastName must be a string' })
  lastName: string;
}

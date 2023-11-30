import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '@/modules/users/dto/user.dto';
import { IsNotEmpty, IsString, Length } from "class-validator";


export class LoginUserDto extends PickType(CreateUserDto, ['email'] as const) {
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 20, {
    message: 'Password length must be between 8 and 20 characters',
  })
  password: string;
}

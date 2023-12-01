import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '@/modules/users/dto/user.dto';


export class LoginUserDto extends PickType(CreateUserDto, [
    'email',
    'password',
] as const) {}

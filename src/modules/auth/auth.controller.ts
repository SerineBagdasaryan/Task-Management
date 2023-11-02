import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/user.dto";
import {TokenResponseDto} from "../users/dto/token-response.dto";
import {User} from "../users/entity/users.entity";

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {
  }


  @Post('/login')
  login(@Body() userDto: Pick<CreateUserDto, 'email' | 'password'>): Promise<TokenResponseDto> {
    return this._authService.login(userDto)
  }

  @Post('/register')
  registration(@Body() userDto: CreateUserDto): Promise<User> {
    return this._authService.registration(userDto)
  }
}

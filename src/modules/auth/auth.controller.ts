import {Body, Controller, Post} from '@nestjs/common';
import {AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/user.dto";
import {TokenResponseDto} from "../users/dto/token-response.dto";
import {User} from "../users/entities/users.entity";
import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {TitleValue} from "@/modules/auth/utils/title-value";
import {LoginUserDto} from "@/modules/users/dto/login-user.dto";
@ApiTags(TitleValue.title)
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {
  }

  @ApiOperation({ summary: TitleValue.login })
  @ApiOkResponse({
    type: TokenResponseDto,
  })
  @Post('/login')
  login(@Body() userDto: LoginUserDto): Promise<TokenResponseDto> {
    return this._authService.login(userDto)
  }

  @ApiOperation({ summary: TitleValue.register })
  @ApiCreatedResponse({
    type: User,
    description: "User Created successfully"
  })
  @Post('/register')
  registration(@Body() userDto: CreateUserDto): Promise<User> {
    return this._authService.registration(userDto)
  }
}

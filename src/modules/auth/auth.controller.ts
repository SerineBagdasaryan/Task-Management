import {Body, Controller, Post} from '@nestjs/common';
import {AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/user.dto";
import {TokenResponseDto} from "../users/dto/token-response.dto";
import {User} from "../users/entities/users.entity";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {DefaultValue} from "@/common/utils/default-value";
import {TitleValue} from "@/modules/auth/utils/title-value";
@ApiTags(DefaultValue.title)
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {
  }

  @ApiOperation({ summary: TitleValue.login })
  @ApiResponse({
    type: TokenResponseDto,
    status: 200
  })
  @Post('/login')
  login(@Body() userDto: Pick<CreateUserDto, 'email' | 'password'>): Promise<TokenResponseDto> {
    return this._authService.login(userDto)
  }

  @ApiOperation({ summary: TitleValue.register })
  @ApiResponse({
    status: 201,
    type: User,
  })
  @Post('/register')
  registration(@Body() userDto: CreateUserDto): Promise<User> {
    return this._authService.registration(userDto)
  }
}

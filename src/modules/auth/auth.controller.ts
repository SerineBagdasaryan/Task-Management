import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { TokenResponseDto } from '../users/dto/token-response.dto';
import { User } from '../users/entities/users.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TitleValue } from '@/modules/auth/utils/title-value';
import { LoginUserDto } from '@/modules/users/dto/login-user.dto';
import { User as UserDecorator } from '@Decorator/user.decorator';
import { ChangePasswordDto } from '@modules/users/dto/change-password.dto';
import { STATUS_CODES } from 'http';
import { RefreshTokenDto } from '@modules/users/dto/refresh-token.dto';

@ApiTags(TitleValue.title)
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: TitleValue.login })
  @ApiOkResponse({
    type: TokenResponseDto,
    description: STATUS_CODES[HttpStatus.OK],
  })
  @Post('/login')
  login(@Body() userDto: LoginUserDto): Promise<TokenResponseDto> {
    return this._authService.login(userDto);
  }

  @ApiOperation({ summary: TitleValue.register })
  @ApiCreatedResponse({
    type: User,
    description: STATUS_CODES[HttpStatus.CREATED],
  })
  @Post('/register')
  registration(@Body() userDto: CreateUserDto): Promise<User> {
    return this._authService.registration(userDto);
  }
  @ApiOperation({ summary: TitleValue.updatePassword })
  @ApiOkResponse({
    type: TokenResponseDto,
    description: STATUS_CODES[HttpStatus.OK],
  })
  @ApiBody({ type: ChangePasswordDto })
  @Patch('/password')
  async changePassword(
    @UserDecorator() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<TokenResponseDto> {
    return this._authService.changePassword(user, changePasswordDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: TitleValue.refreshToken })
  @ApiOkResponse({
    type: TokenResponseDto,
    description: STATUS_CODES[HttpStatus.OK],
  })
  @Post('/refresh-token')
  async refreshToken(
    @Body() refreshToken: RefreshTokenDto,
  ): Promise<TokenResponseDto> {
    return this._authService.refreshToken(refreshToken);
  }
}

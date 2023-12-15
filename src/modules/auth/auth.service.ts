import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/users.entity';
import { CreateUserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenResponseDto } from '../users/dto/token-response.dto';
import { Transactional } from 'typeorm-transactional';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '@common/messages';
import { ChangePasswordDto } from '@modules/users/dto/change-password.dto';
import { RefreshTokenDto } from '@modules/users/dto/refresh-token.dto';
import { verifyRefreshToken } from '@common/utils/jwt-utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UsersService,
    private readonly _jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly _cacheManager: Cache,
    private readonly _configService: ConfigService,
  ) {}

  @Transactional()
  async changePassword(
    user: User,
    changePasswordDto: ChangePasswordDto,
  ): Promise<TokenResponseDto> {
    const { newPassword } = changePasswordDto;
    try {
      const existingUser = await this._userService.getUserByEmail(user.email);

      if (!existingUser) {
        throw new BadRequestException(ERROR_MESSAGES.USER_NOT_EXISTS);
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this._userService.updatePassword(user.id, hashedPassword);

      return await this.login({ email: user.email, password: newPassword });
    } catch (error) {
      console.error('Error while changing password:', error);
      throw new InternalServerErrorException('Unable to change password');
    }
  }

  async login(
    userDto: Pick<CreateUserDto, 'email' | 'password'>,
  ): Promise<TokenResponseDto> {
    try {
      const user = await this.validateUser(userDto);
      const accessToken = await this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user);

      await this._cacheManager.del(String(user.id));

      const ttl = this._configService.get<number>('TTL');
      await this._cacheManager.set(
        String(user.id),
        {
          accessToken,
          refreshToken,
        },
        ttl,
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async registration(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, password } = createUserDto;

      const existingUser = await this._userService.getUserByEmail(email);

      if (existingUser) {
        throw new ConflictException(ERROR_MESSAGES.USER_NAME_EXISTS);
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await this._userService.createUser({
        ...createUserDto,
        password: hashPassword,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id, role: user.role };
    return await this._jwtService.signAsync(payload);
  }
  async generateRefreshToken(user: User): Promise<string> {
    const refreshTokenSecret =
      this._configService.get<string>('JWT_REFRESH_SECRET');
    const refreshExpiresIn = this._configService.get<string>('REFRESH_EXP');

    return this._jwtService.sign(
      { email: user.email, id: user.id, role: user.role },
      { secret: refreshTokenSecret, expiresIn: refreshExpiresIn },
    );
  }

  async validateUser(
    userDto: Pick<CreateUserDto, 'email' | 'password'>,
  ): Promise<User> {
    const user = await this._userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.USER_NOT_EXISTS);
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException(ERROR_MESSAGES.PASSWORD_NOT_MATCH);
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponseDto> {
    try {
      const { refreshToken } = refreshTokenDto;
      const secret = this._configService.get('JWT_REFRESH_SECRET');
      const decodedRefreshToken = verifyRefreshToken(refreshToken, secret);

      const cachedTokens: TokenResponseDto = await this._cacheManager.get(
        String(decodedRefreshToken.id),
      );

      if (!decodedRefreshToken || refreshToken !== cachedTokens.refreshToken) {
        throw new UnauthorizedException(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
      }

      await this._cacheManager.del(String(decodedRefreshToken.id));

      const accessToken = await this.generateAccessToken(decodedRefreshToken);
      const newRefreshToken = await this.generateRefreshToken(
        decodedRefreshToken,
      );

      const ttl = this._configService.get<number>('TTL');
      await this._cacheManager.set(
        String(decodedRefreshToken.id),
        {
          accessToken,
          refreshToken: newRefreshToken,
        },
        ttl,
      );
      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (e) {
      throw e;
    }
  }
}

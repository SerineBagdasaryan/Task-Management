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
import {ChangePasswordDto} from "@modules/users/dto/change-password.dto";

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
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    await this._cacheManager.del(String(user.id));
    const ttl = this._configService.get<number>('TTL');
    await this._cacheManager.set(String(user.id), token, ttl);
    return {
      accessToken: token,
      id: user.id,
    };
  }

  async registration(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const existingUser = await this._userService.getUserByEmail(email);
    if (existingUser) {
        throw new ConflictException(ERROR_MESSAGES.USER_NAME_EXISTS);
    }
    const hashPassword = await bcrypt.hash(password, 10);

    return await this._userService.createUser({
      ...createUserDto,
      password: hashPassword,
    });
  }

  async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id, role: user.role };
    return await this._jwtService.signAsync(payload);
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
}

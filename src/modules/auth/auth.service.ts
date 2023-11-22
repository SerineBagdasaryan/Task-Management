import {
    BadRequestException,
    ConflictException,
    Injectable, InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import {User} from "../users/entities/users.entity";
import {CreateUserDto} from "../users/dto/user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {Error} from "../users/enum/errors.enum";
import * as bcrypt from 'bcrypt';
import {TokenResponseDto} from "../users/dto/token-response.dto";
import {Transactional} from "typeorm-transactional";

@Injectable()
export class AuthService {
    constructor(private readonly _userService: UsersService,
                private readonly _jwtService: JwtService,
    ) {}

    @Transactional()
    async changePassword(user: User, newPassword: string): Promise<TokenResponseDto> {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this._userService.updatePassword(user.id, hashedPassword);

            const loginResponse = await this.login({ email: user.email, password: newPassword });
            return loginResponse;
        } catch (error) {
            console.error('Error while changing password:', error);
            throw new InternalServerErrorException('Unable to change password');
        }
    }


    async login(userDto: Pick<CreateUserDto, 'email' | 'password'>): Promise<TokenResponseDto> {
        const user = await this.validateUser(userDto);
        const token = await this.generateToken(user);
        await this._userService.createOrUpdateToken(user.id, token);
        return {
            accessToken: token,
            id: user.id
        };
    }

    async registration(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto;
        const existingUser = await this._userService.getUserByEmail(email);
        if (existingUser) {
            throw new ConflictException(Error.USER_EXISTS);
        }
        const hashPassword = await bcrypt.hash(password, 10);

       return await this._userService.createUser({
            ...createUserDto,
            password: hashPassword,
        })
    }

    async generateToken(user: User): Promise<string> {
        const payload = {email: user.email, id: user.id, role: user.role};
            return await this._jwtService.signAsync(payload);
    }

    async validateUser(userDto: Pick<CreateUserDto, 'email' | 'password'>): Promise<User> {
        const user = await this._userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new BadRequestException(Error.USER_NOT_EXISTS);
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException(Error.PASSWORD_NOT_MATCH);
    }


}

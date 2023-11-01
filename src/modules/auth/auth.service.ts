import {
    BadRequestException,
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {User} from "../users/entity/users.entity";
import {CreateUserDto} from "../users/dto/user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {ErrorEnum} from "../users/enum/errors.enum";
import * as bcrypt from 'bcrypt';
import {TokenResponseDto} from "../users/dto/token-response.dto";

@Injectable()
export class AuthService {
    constructor(private readonly _userService: UsersService,
                private readonly _jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
    }

    async registration(createUserDto: CreateUserDto) {
        const { email, password, name } = createUserDto;
        const existingUser = await this._userService.getUserByEmail(email);
        if (existingUser) {
            throw new ConflictException(ErrorEnum.USER_EXISTS);
        }
        const hashPassword = await bcrypt.hash(password, 10);

       return await this._userService.createUser({
            ...createUserDto,
            password: hashPassword,
        })
    }

    private async generateToken(user: User): Promise<TokenResponseDto> {
        const payload = {email: user.email, id: user.id, roles: user.role};
        return {
            access_token: await this._jwtService.signAsync(payload),
            id: user.id
        };
    }

    private async validateUser(userDto: CreateUserDto): Promise<User> {
        const user = await this._userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new BadRequestException(ErrorEnum.USER_NOT_EXISTS);
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException(ErrorEnum.PASSWORD_NOT_MATCH);
    }


}

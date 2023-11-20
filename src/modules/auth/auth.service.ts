import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {User} from "../users/entities/users.entity";
import {CreateUserDto} from "../users/dto/user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {Error} from "../users/enum/errors.enum";
import * as bcrypt from 'bcrypt';
import {TokenResponseDto} from "../users/dto/token-response.dto";
import {Return} from "@Helper/return.helper";
import {ResponseDataDTO} from "@Dto/response-data.dto";

@Injectable()
export class AuthService {
    constructor(private readonly _userService: UsersService,
                private readonly _jwtService: JwtService) {}

    async login(userDto: Pick<CreateUserDto, 'email' | 'password'>): Promise<TokenResponseDto> {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(createUserDto: CreateUserDto): Promise<ResponseDataDTO<User>> {
        const { email, password } = createUserDto;
        const existingUser = await this._userService.getUserByEmail(email);
        if (existingUser) {
            throw new ConflictException(Error.USER_EXISTS);
        }
        const hashPassword = await bcrypt.hash(password, 10);

       const data =  await this._userService.createUser({
            ...createUserDto,
            password: hashPassword,
        })
        return Return.returnData(data);
    }

    async generateToken(user: User): Promise<TokenResponseDto> {
        const payload = {email: user.email, id: user.id, role: user.role};
        return {
            accessToken: await this._jwtService.signAsync(payload),
            id: user.id
        };
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

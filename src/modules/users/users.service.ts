import {BadRequestException, ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import {UserRepository} from "./entity/users.repository";
import {User} from "./entity/users.entity";
import {RoleEnum} from "../../common/enums/role";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {ErrorEnum} from "./enum/errors.enum";
import {TokenResponseDto} from "./dto/token-response.dto";

@Injectable()
export class UsersService {
    constructor(private readonly _userRepository: UserRepository,
                private readonly _jwtService: JwtService) {
    }

    async createUser(userDto: UserDto): Promise<User> {
        const { email, password, name } = userDto;

        try {
            const existingUser = await this._userRepository.findByEmail(email);
            if (existingUser) {
                throw new ConflictException(ErrorEnum.USER_EXISTS);
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this._userRepository.create({
                email,
                password: hashedPassword,
                name,
                role: RoleEnum.USER
            });
            return this._userRepository.save(user);
        } catch (error) {
            throw error;
        }
    }

    async login(userDto: UserDto): Promise<TokenResponseDto> {
        const { email, password } = userDto;

        const user = await this._userRepository.findByEmail(email);
        if (!user) {
            throw new BadRequestException(ErrorEnum.USER_NOT_EXISTS);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException(ErrorEnum.PASSWORD_NOT_MATCH);
        }
        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this._jwtService.signAsync(payload),
            id: user.id
        };
    }
}

import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
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
        const { email, password } = userDto;

        try {
            const existingUser = await this._userRepository.findByEmail(email);
            if (existingUser) {
                throw new ConflictException(ErrorEnum.USER_EXISTS);
            }

            const user = new User();
            user.email = email;
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.role = RoleEnum.USER;

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
            throw new BadRequestException(ErrorEnum.BAD_REQUEST);
        }
        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this._jwtService.signAsync(payload),
            id: user.id
        };
    }
}

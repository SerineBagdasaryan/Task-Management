import {BadRequestException, ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from './dto/user.dto';
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

    async getUserByEmail(email: string): Promise<User> {
        return await this._userRepository.findByEmail(email);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this._userRepository.create(createUserDto);
        user.role = RoleEnum.USER;
        return this._userRepository.save(user);
    }

}

import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/user.dto';
import {UserRepository} from "./entities/users.repository";
import {User} from "./entities/users.entity";

@Injectable()
export class UsersService {
    constructor(private readonly _userRepository: UserRepository) {
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this._userRepository.findByEmail(email);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this._userRepository.create(createUserDto);
        return this._userRepository.save(user);
    }

}

import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/user.dto';
import {UserRepository} from "./entities/users.repository";
import {User} from "./entities/users.entity";
import {TasksService} from "../tasks/tasks.service";

@Injectable()
export class UsersService {
    constructor(private readonly _userRepository: UserRepository,
                private readonly _taskService: TasksService) {
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this._userRepository.findByEmail(email);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this._userRepository.create(createUserDto);
        return this._userRepository.save(user);
    }

    async getStat(userId: number): Promise<number> {
        return await this._taskService.getStat(userId);
    }


}

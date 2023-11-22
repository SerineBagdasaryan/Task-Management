import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/user.dto';
import {UserRepository} from "./entities/users.repository";
import {User} from "./entities/users.entity";
import {TasksService} from "../tasks/tasks.service";
import {UsersToken} from "@/modules/users/entities/users-token.entity";
import {UsersTokenRepository} from "@/modules/users/entities/users-token.repository";
import {UpdateResult} from "typeorm";

@Injectable()
export class UsersService {
    constructor(private readonly _userRepository: UserRepository,
                private readonly _taskService: TasksService,
                private readonly _usersTokenRepository: UsersTokenRepository) {
    }

    async createOrUpdateToken(userId: number, newToken: string): Promise<UsersToken> {
        let userToken = await this._usersTokenRepository.findOneById(userId);

        if (!userToken) {
            userToken = this._usersTokenRepository.create();
            userToken.userId = userId;
        }

        userToken.token = newToken;

        return this._usersTokenRepository.save(userToken);
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

    async updatePassword(userId: number, newPassword: string): Promise<UpdateResult> {
        try {
            return await this._userRepository.updatePassword(userId, newPassword);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }


}

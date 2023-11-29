import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './entities/users.repository';
import { User } from './entities/users.entity';
import { TasksService } from '../tasks/tasks.service';
import { UpdateResult } from 'typeorm';
import {UpdateProfileDto} from "@modules/users/dto/update-profile.dto";
import {ERROR_MESSAGES} from "@common/messages";

@Injectable()
export class UsersService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _taskService: TasksService,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this._userRepository.findByEmail(email);
  }

  async findOne(id: number): Promise<User | undefined> {
    return this._userRepository.findOneById(id);
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<User> {
    if(Object.keys(updateProfileDto).length === 0) {
      throw new NotFoundException(ERROR_MESSAGES.EMPTY_BODY);
    }
    const user = await this.findOne(id);

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGES.USER_NOT_EXISTS);
    }

    Object.assign(user, updateProfileDto);

    return this._userRepository.save(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this._userRepository.create(createUserDto);
    return this._userRepository.save(user);
  }

  async getStat(userId: number): Promise<number> {
    return await this._taskService.getStat(userId);
  }

  async updatePassword(
    userId: number,
    newPassword: string,
  ): Promise<UpdateResult> {
    try {
      return await this._userRepository.updatePassword(userId, newPassword);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}

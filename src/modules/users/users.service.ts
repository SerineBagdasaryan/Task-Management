import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './entities/users.repository';
import { User } from './entities/users.entity';
import { TasksService } from '../tasks/tasks.service';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { ERROR_MESSAGES } from '@common/messages';
import { isEmpty } from 'lodash';

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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (isEmpty(updateUserDto)) {
      throw new NotFoundException(ERROR_MESSAGES.EMPTY_BODY);
    }

    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_EXISTS);
    }

    const existingUser = await this.getUserByEmail(updateUserDto.email);
    if (existingUser && existingUser?.id !== id) {
      throw new BadRequestException(ERROR_MESSAGES.USER_EMAIL_IN_USE);
    }

    try {
      await this._userRepository.update(id, updateUserDto);
      return await this.findOne(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
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

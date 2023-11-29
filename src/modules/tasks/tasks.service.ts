import {BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {TaskRepository} from './entities/task.repository';
import {Task} from './entities/task.entity';
import {Return} from '@Helper/return.helper';
import {ResponseDataDTO} from '@Dto/response-data.dto';
import {ResponseDataPaginationDTO} from '@Dto/response-data-pagination.dto';
import {FilterTaskDto} from './dto/filter-task.dto';
import {User} from '../users/entities/users.entity';
import {ERROR_MESSAGES} from "@common/messages";

@Injectable()
export class TasksService {
  constructor(private readonly _taskRepository: TaskRepository) {}

  async getStat(userId: number): Promise<number> {
    try {
      return await this._taskRepository.getStat(userId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    userId: number,
  ): Promise<ResponseDataDTO<Task>> {
    try {
      const data = await this._taskRepository.save(
        this._taskRepository.create({
          ...createTaskDto,
          userId,
        }),
      );
      return Return.returnData(data);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findAll(
    user: User,
    query: FilterTaskDto,
  ): Promise<ResponseDataPaginationDTO<Task[]>> {
    try {
      const [data, count] = await this._taskRepository.findAll(user, query);
      return Return.returnDataPagination(data, count);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    try {
      if(Object.keys(updateTaskDto).length === 0) {
        throw new NotFoundException(ERROR_MESSAGES.NOT_UPDATED_DATA);
      }
        const result = await this._taskRepository.updateTask(id, updateTaskDto, user);

      if (!result) {
        throw new NotFoundException(ERROR_MESSAGES.TASK_NOT_EXISTS);
      }
      return result;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async delete(id: number, user: User): Promise<void> {
    try {
      const result = await this._taskRepository.deleteTask(id, user);
      if (result.affected === 0) {
        throw new NotFoundException(ERROR_MESSAGES.TASK_NOT_EXISTS);
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, MoreThanOrEqual, Repository } from 'typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FilterTaskDto } from '../dto/filter-task.dto';
import { User } from '../../users/entities/users.entity';
import { Role } from '@common/enums/role.enum';
import { TaskFindAllOptions } from '@/modules/tasks/interfaces/find-task-options.interface';

export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {
    super(
      taskRepository.target,
      taskRepository.manager,
      taskRepository.queryRunner,
    );
  }

  async getStat(userId: number): Promise<number> {
    return await this.taskRepository.count({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  async findAll(user: User, query: FilterTaskDto): Promise<[Task[], number]> {
    const options: TaskFindAllOptions = {
      take: Number(query.take || 10),
      skip: Number(query.skip || 0),
    };

    if (user.role === Role.USER) {
      options.where = { user: { id: user.id } };
    } else {
      options.relations = ['user'];
    }

    if (query?.status) {
      options.where = {
        ...options.where,
        status: query.status,
      };
    }

    if (query?.dueDate) {
      options.where = {
        ...options.where,
        dueDate: MoreThanOrEqual(new Date(query.dueDate)),
      };
    }

    return await this.taskRepository.findAndCount(options);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const result = await this.taskRepository
        .createQueryBuilder('task')
        .update(Task)
        .set(updateTaskDto)
        .where('task.id = :id', { id })
        .returning('*')

    if (user.role === Role.USER) {
      result.andWhere('task.user_id = :userId', { userId: user.id });
    }

    const updatedUser = await result.execute();
    return updatedUser.raw[0];
  }

  async deleteTask(id: number, user: User): Promise<DeleteResult> {
    const result = await this.createQueryBuilder('task')
      .delete()
      .where('task.id = :id', { id });
    if (user.role === Role.USER) {
      result.andWhere('task.user_id = :userId', { userId: user.id });
    }
    return await result.execute();
  }
}
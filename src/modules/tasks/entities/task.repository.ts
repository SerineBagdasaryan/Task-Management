import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {Task} from "./task.entity";
import {BaseQueryDto} from "@Dto/base-query.dto";
import {UpdateTaskDto} from "../dto/update-task.dto";
import {FilterTaskDto} from "../dto/filter-task.dto";
import {User} from "../../users/entities/users.entity";
import {Role} from "@/common/enums/role.enum";
import {TaskFindAllOptions} from "@/modules/tasks/interfaces/find-task-options.interface";


export class TaskRepository extends Repository<Task> {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {
        super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner);
    }

    async filteredTasks(
        query: FilterTaskDto,
        user: User,
    ): Promise<[Task[], number]> {

        const queryBuilder = this.taskRepository.createQueryBuilder('task');

        if (user.role === Role.USER) {
            queryBuilder.where('task.userId = :userId', {userId: user.id});
        } else {
            queryBuilder.leftJoinAndSelect('task.user', 'user');
        }
        if (query?.status) {
            queryBuilder.andWhere('task."status" = :status', {
                status: query?.status,
            });
        }
        if (query?.dueDate) {
            queryBuilder.andWhere('task."due_date" >= :dueDate', {
                dueDate: query?.dueDate,
            });
        }

        return await queryBuilder
            .take(Number(query.take || 10))
            .skip(Number(query.skip || 0))
            .getManyAndCount();
    }
    async getStat(userId: number): Promise<number> {
       return await this.taskRepository.count({ relations: ['user'], where: { user: { id: userId } } });
    }

    async findAll(user: User, query: BaseQueryDto): Promise<[Task[], number]> {
        const options: TaskFindAllOptions = {
            take: Number(query.take || 10),
            skip: Number(query.skip || 0),
        };

        if (user.role === Role.USER) {
            options.where = { user: { id: user.id } };
        } else {
            options.relations = ['user'];
        }

        return await this.taskRepository.findAndCount(options);
    }

    async updateTask(id: number, updateUserDto: UpdateTaskDto, user: User): Promise<void> {
       const result = this.taskRepository.createQueryBuilder('task')
            .update(Task)
            .set(updateUserDto)
            .where('task.id = :id', {id})

        if (user.role === Role.USER) {
            result.andWhere('task.user_id = :userId', {userId: user.id});
        }
        await result.execute();

    }

    async deleteTask(id: number, user: User): Promise<DeleteResult> {
        const result =  await this.createQueryBuilder('task')
            .delete()
            .where('task.id = :id', { id })
        if (user.role === Role.USER) {
            result.andWhere('task.user_id = :userId', {userId: user.id});
        }
          return await result.execute();
    }


}
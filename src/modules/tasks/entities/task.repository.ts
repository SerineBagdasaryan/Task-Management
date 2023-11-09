import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Task} from "./task.entity";
import {BaseQueryDto} from "../../../common/dto/base-query.dto";
import {UpdateTaskDto} from "../dto/update-task.dto";
// import {ParamDto} from "../../../common/dto/param.dto";
import {FilterTaskDto} from "../dto/filter-task.dto";
import {User} from "../../users/entities/users.entity";
import {Role} from "../../../common/enums/role.enum";


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


    async getStat(userId: number, ): Promise<number> {
       return this.taskRepository
            .createQueryBuilder('task')
            .where('task.userId = :userId', { userId }).getCount();
    }

    async findAll(user: User, query: BaseQueryDto): Promise<[Task[], number]> {

        const queryBuilder = this.taskRepository.createQueryBuilder('task');

        if (user.role === Role.USER) {
            queryBuilder.where('task.userId = :userId', {userId: user.id});
        } else {
            queryBuilder.leftJoinAndSelect('task.user', 'user');
        }

        return await queryBuilder
            .take(Number(query.take || 10))
            .skip(Number(query.skip || 0))
            .getManyAndCount();

    }

    async updateTask(id: number, updateUserDto: UpdateTaskDto): Promise<void> {
        await this.taskRepository.createQueryBuilder('task')
            .update(Task)
            .set(updateUserDto)
            .where('task.id = :id', {id})
            .execute();
    }


}
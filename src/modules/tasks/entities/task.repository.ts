import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Task} from "./task.entity";
import {BaseQueryDto} from "../../../common/dto/base-query.dto";
import {UpdateTaskDto} from "../dto/update-task.dto";
import {ParamDto} from "../../../common/dto/param.dto";



export class TaskRepository extends Repository<Task> {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {
        super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner);
    }

    async findAll(userId: number, query: BaseQueryDto): Promise<[Task[], number]>  {
        const result = this.taskRepository
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.user', 'user')
            .where('task.userId = :userId', { userId })
            .take(Number(query.take || 10))
            .skip(Number(query.skip || 0));

        return await result.getManyAndCount();

    }

    async updateTask(id: ParamDto, updateUserDto: UpdateTaskDto): Promise<void> {
         await this.taskRepository.createQueryBuilder('task')
            .update(Task)
            .set(updateUserDto)
            .where('task.id = :id', { id })
            .execute();
    }


}
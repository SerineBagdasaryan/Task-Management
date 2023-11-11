import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {TaskRepository} from "./entities/task.repository";
import {Task} from "./entities/task.entity";
import {Return} from "@Helper/return.helper";
import {ResponseDataDTO} from "@Dto/response-data.dto";
import {BaseQueryDto} from "@Dto/base-query.dto";
import {ResponseDataPaginationDTO} from "@Dto/response-data-pagination.dto";
import {ResponseDTO} from "@Dto/response.dto";
import {FilterTaskDto} from "./dto/filter-task.dto";
import {User} from "../users/entities/users.entity";
import {DeleteResult} from "typeorm";


@Injectable()
export class TasksService {

    constructor(private readonly _taskRepository: TaskRepository) {
    }


    async filteredTasks(
        query: FilterTaskDto,
        user: User,
    ): Promise<ResponseDataPaginationDTO<Task[]>> {
        try {
            const [data, count] = await this._taskRepository.filteredTasks(
                query,
                user
            );
            return Return.returnDataPagination(data, count);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async getStat(userId: number): Promise<number> {
        try {
           return await this._taskRepository.getStat(userId);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async createTask(createTaskDto: CreateTaskDto, userId: number): Promise<ResponseDataDTO<Task>> {
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

    async findAll(user: User, query: BaseQueryDto): Promise<ResponseDataPaginationDTO<Task[]>> {
        try {
            const [data, count] =
                await this._taskRepository.findAll(user, query);
            return Return.returnDataPagination(data, count);
        } catch (e) {
            throw new BadRequestException(e);
        }

    }

    findOne(id: number) {
        return `This action returns a #${id} task`;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<ResponseDTO> {
        try {
            await this._taskRepository.updateTask(id, updateTaskDto, user);
            return Return.ok();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async delete(id: number, user: User): Promise<DeleteResult> {
        try {
         return await this._taskRepository.deleteTask(id, user);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}

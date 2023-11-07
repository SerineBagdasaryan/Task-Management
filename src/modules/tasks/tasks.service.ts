import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {TaskRepository} from "./entities/task.repository";
import {Task} from "./entities/task.entity";
import {Return} from "../../common/helpers/return.helper";
import {ResponseDataDTO} from "../../common/dto/response-data.dto";
import {BaseQueryDto} from "../../common/dto/base-query.dto";
import {ResponseDataPaginationDTO} from "../../common/dto/response-data-pagination.dto";
import {ResponseDTO} from "../../common/dto/response.dto";
import {ParamDto} from "../../common/dto/param.dto";
import {FilterTaskDto} from "./dto/filter-task.dto";


@Injectable()
export class TasksService {

    constructor(private readonly _taskRepository: TaskRepository) {
    }


    async filteredTasks(
        query: FilterTaskDto,
        userId: number,
    ): Promise<ResponseDataPaginationDTO<Task[]>> {
        try {
            const [data, count] = await this._taskRepository.filteredTasks(
                query,
                userId
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

    async findAll(userId: number, query: BaseQueryDto): Promise<ResponseDataPaginationDTO<Task[]>> {
        try {
            const [data, count] =
                await this._taskRepository.findAll(userId, query);
            return Return.returnDataPagination(data, count);
        } catch (e) {
            throw new BadRequestException(e);
        }

    }

    findOne(id: number) {
        return `This action returns a #${id} task`;
    }

    async update(id: ParamDto, updateTaskDto: UpdateTaskDto): Promise<ResponseDTO> {
        try {
            await this._taskRepository.updateTask(id, updateTaskDto);
            return Return.ok();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async delete(id: ParamDto): Promise<ResponseDTO> {
        try {
            await this._taskRepository.delete(id);
            return Return.ok();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}

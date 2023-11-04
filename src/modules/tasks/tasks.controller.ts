import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {User as UserDecorator} from "../../common/decorators/user.decorator";
import {User} from "../users/entities/users.entity";
import {Task} from "./entities/task.entity";
import {ResponseDataDTO} from "../../common/dto/response-data.dto";
import {BaseQueryDto} from "../../common/dto/base-query.dto";
import {ResponseDataPaginationDTO} from "../../common/dto/response-data-pagination.dto";
import {ParamDto} from "../../common/dto/param.dto";
import {ResponseDTO} from "../../common/dto/response.dto";

@Controller('tasks')
export class TasksController {
  constructor(private readonly _tasksService: TasksService) {}

  @Post()
  createTask(
      @UserDecorator() user: User,
      @Body() createTaskDto: CreateTaskDto): Promise<ResponseDataDTO<Task>> {
    return this._tasksService.createTask(createTaskDto, user.id);
  }

  @Get()
  findAll(
      @UserDecorator() user: User,
      @Query() query: BaseQueryDto,
  ): Promise<ResponseDataPaginationDTO<Task[]>> {
    return this._tasksService.findAll(user.id, query);
  }


  @Patch(':id')
  update(@Param('id') id: ParamDto, @Body() updateTaskDto: UpdateTaskDto): Promise<ResponseDTO> {
    return this._tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: ParamDto): Promise<ResponseDTO> {
    return this._tasksService.delete(id);
  }
}

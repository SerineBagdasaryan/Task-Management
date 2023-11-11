import {Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {User as UserDecorator} from "@Decorator/user.decorator";
import {User} from "../users/entities/users.entity";
import {Task} from "./entities/task.entity";
import {ResponseDataDTO} from "@/common/dto/response-data.dto";
import {BaseQueryDto} from "@/common/dto/base-query.dto";
import {ResponseDataPaginationDTO} from "@/common/dto/response-data-pagination.dto";
import {ResponseDTO} from "@/common/dto/response.dto";
import {FilterTaskDto} from "./dto/filter-task.dto";
import {RoleGuard} from "@/common/guards/roles.guard";
import {Roles} from "@/common/decorators/roles.decorator";
import {Role} from "@/common/enums/role.enum";
import {DeleteResult} from "typeorm";

@Controller('tasks')
export class TasksController {
  constructor(private readonly _tasksService: TasksService) {}

  @Post()
  createTask(
      @UserDecorator() user: User,
      @Body() createTaskDto: CreateTaskDto): Promise<ResponseDataDTO<Task>> {
    return this._tasksService.createTask(createTaskDto, user.id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Get('admin')
  greetingsAdmin(): string {
    return 'Hello Admin!';
  }
  @Roles(Role.USER)
  @UseGuards(RoleGuard)
  @Get('user')
  greetingsUser(): string {
    return 'Hello User!';
  }


  @Get()
  findAll(
      @UserDecorator() user: User,
      @Query() query: BaseQueryDto,
  ): Promise<ResponseDataPaginationDTO<Task[]>> {
    return this._tasksService.findAll(user, query);
  }


  @Patch(':id')
  update(@UserDecorator() user: User,
         @Param('id', ParseIntPipe) id: number,
         @Body() updateTaskDto: UpdateTaskDto): Promise<ResponseDTO> {
    return this._tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number,
         @UserDecorator() user: User): Promise<DeleteResult> {
    return this._tasksService.delete(id, user);
  }
  @Get('filtered')
  async filteredTasks(
      @UserDecorator() user: User,
      @Query() query: FilterTaskDto,
  ): Promise<ResponseDataPaginationDTO<Task[]>> {
    return this._tasksService.filteredTasks(query, user);
  }
}

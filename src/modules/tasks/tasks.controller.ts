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
import {ApiBody, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {TitleValue} from "./utils/title-value";

@ApiTags(TitleValue.title)
@Controller('tasks')
export class TasksController {
  constructor(private readonly _tasksService: TasksService) {}

  @ApiOperation({ summary: TitleValue.createTask })
  @ApiOkResponse({
    type: Task,
  })
  @Post()
  createTask(
      @UserDecorator() user: User,
      @Body() createTaskDto: CreateTaskDto): Promise<ResponseDataDTO<Task>> {
    return this._tasksService.createTask(createTaskDto, user.id);
  }

  @ApiOperation({ summary: TitleValue.adminAccess })
  @ApiOkResponse({
    type: String,
  })
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Get('admin')
  greetingsAdmin(): string {
    return 'Hello Admin!';
  }

  @ApiOperation({ summary: TitleValue.userAccess })
  @ApiOkResponse({
    type: String,
  })
  @Roles(Role.USER)
  @UseGuards(RoleGuard)
  @Get('user')
  greetingsUser(): string {
    return 'Hello User!';
  }

  @ApiOperation({ summary: TitleValue.getTask })
  @ApiOkResponse({
    type: [Task],
  })
  @Get()
  findAll(
      @UserDecorator() user: User,
      @Query() query: BaseQueryDto,
  ): Promise<ResponseDataPaginationDTO<Task[]>> {
    return this._tasksService.findAll(user, query);
  }

  @ApiOperation({ summary: TitleValue.updateTask })
  @ApiOkResponse({
    type: ResponseDTO,
  })
  @ApiBody({ type: UpdateTaskDto})
  @Patch(':id')
  update(@UserDecorator() user: User,
         @Param('id', ParseIntPipe) id: number,
         @Body() updateTaskDto: UpdateTaskDto): Promise<ResponseDTO> {
    return this._tasksService.update(id, updateTaskDto, user);
  }

  @ApiOperation({ summary: TitleValue.deleteTask })
  @ApiOkResponse({
    type: DeleteResult,
  })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number,
         @UserDecorator() user: User): Promise<DeleteResult> {
    return this._tasksService.delete(id, user);
  }

  @ApiOperation({ summary: TitleValue.filterTask })
  @ApiOkResponse({
    type: [Task],
  })
  @Get('filtered')
  async filteredTasks(
      @UserDecorator() user: User,
      @Query() query: FilterTaskDto,
  ): Promise<ResponseDataPaginationDTO<Task[]>> {
    return this._tasksService.filteredTasks(query, user);
  }
}

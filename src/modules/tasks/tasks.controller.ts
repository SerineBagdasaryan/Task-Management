import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User as UserDecorator } from '@Decorator/user.decorator';
import { User } from '../users/entities/users.entity';
import { Task } from './entities/task.entity';
import { ResponseDataDTO } from '@common/dto/response-data.dto';
import { ResponseDataPaginationDTO } from '@common/dto/response-data-pagination.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { RoleGuard } from '@common/guards/roles.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/enums/role.enum';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TitleValue } from './utils/title-value';
import { ItemResponseTypeDecorator } from "@Decorator/item-response-type.decorator";
import {STATUS_CODES} from "http";


@ApiTags(TitleValue.title)
@Controller('tasks')
export class TasksController {
  constructor(private readonly _tasksService: TasksService) {}

  @ApiOperation({ summary: TitleValue.createTask })
  @ItemResponseTypeDecorator(Task, HttpStatus.CREATED, STATUS_CODES[HttpStatus.CREATED] )
  @Post()
  createTask(
    @UserDecorator() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ResponseDataDTO<Task>> {
    return this._tasksService.createTask(createTaskDto, user.id);
  }

  @ApiOperation({ summary: TitleValue.adminAccess })
  @ApiOkResponse({
    type: String,
  })
  @ApiExcludeEndpoint()
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
  @ApiExcludeEndpoint()
  @Roles(Role.USER)
  @UseGuards(RoleGuard)
  @Get('user')
  greetingsUser(): string {
    return 'Hello User!';
  }

  @ApiOperation({ summary: TitleValue.getTask })
  @ItemResponseTypeDecorator([Task], HttpStatus.OK, STATUS_CODES[HttpStatus.OK] )
  @Get()
  findAll(
    @UserDecorator() user: User,
    @Query() query: FilterTaskDto,
  ): Promise<ResponseDataPaginationDTO<Task[]>> {
    return this._tasksService.findAll(user, query);
  }

  @ApiOperation({ summary: TitleValue.updateTask })
  @ItemResponseTypeDecorator(Task, HttpStatus.OK, STATUS_CODES[HttpStatus.OK] )
  @ApiBody({ type: UpdateTaskDto })
  @Patch(':id')
  update(
    @UserDecorator() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task>{
    return this._tasksService.update(id, updateTaskDto, user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: TitleValue.deleteTask })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @UserDecorator() user: User,
  ): Promise<void> {
    return this._tasksService.delete(id, user);
  }
}

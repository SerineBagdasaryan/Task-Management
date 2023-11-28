import { Controller, Get, Post, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from '@/modules/courses/entities/course.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TitleValue } from './utils/title-value';

@ApiTags(TitleValue.title)
@Controller('courses')
export class CoursesController {
  constructor(private readonly _coursesService: CoursesService) {}

  @ApiOperation({ summary: TitleValue.createCourse })
  @ApiCreatedResponse({
    type: Course,
  })
  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this._coursesService.createCourse(createCourseDto);
  }

  @ApiOperation({ summary: TitleValue.getCourse })
  @ApiOkResponse({
    type: [Course],
  })
  @Get()
  getAllCourses(): Promise<Course[]> {
    return this._coursesService.getAllCourses();
  }
}

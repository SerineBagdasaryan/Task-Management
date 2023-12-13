import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from '@/modules/courses/entities/course.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TitleValue } from './utils/title-value';
import { ItemResponseTypeDecorator } from '@common/decorators';
import { STATUS_CODES } from 'http';

@ApiTags(TitleValue.title)
@Controller('courses')
export class CoursesController {
  constructor(private readonly _coursesService: CoursesService) {}

  @ApiOperation({ summary: TitleValue.createCourse })
  @ItemResponseTypeDecorator(
    Course,
    HttpStatus.CREATED,
    STATUS_CODES[HttpStatus.CREATED],
  )
  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this._coursesService.createCourse(createCourseDto);
  }

  @ApiOperation({ summary: TitleValue.getCourse })
  @ItemResponseTypeDecorator(
    [Course],
    HttpStatus.OK,
    STATUS_CODES[HttpStatus.OK],
  )
  @Get()
  getAllCourses(): Promise<Course[]> {
    return this._coursesService.getAllCourses();
  }
}

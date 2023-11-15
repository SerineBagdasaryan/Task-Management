import { Controller, Get, Post, Body} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import {Course} from "@/modules/courses/entities/course.entity";

@Controller('courses')
export class CoursesController {
  constructor(private readonly _coursesService: CoursesService) {}

  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this._coursesService.createCourse(createCourseDto);
  }

  @Get()
  getAllCourses(): Promise<Course[]> {
    return this._coursesService.getAllCourses();
  }

}

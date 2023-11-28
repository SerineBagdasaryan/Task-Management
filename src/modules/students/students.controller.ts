import { Controller, Get, Post, Body } from '@nestjs/common';
import { StudentService } from './students.service';
import { CreateStudentDto } from '@/modules/students/dto/create-student.dto';
import { Student } from '@/modules/students/entities/student.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TitleValue } from './utils/title-value';

@ApiTags(TitleValue.title)
@Controller('students')
export class StudentsController {
  constructor(private readonly _studentService: StudentService) {}

  @ApiOperation({ summary: TitleValue.createStudent })
  @ApiCreatedResponse({
    type: Student,
  })
  @Post()
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    return this._studentService.createStudent(createStudentDto);
  }

  @ApiOperation({ summary: TitleValue.getStudent })
  @ApiOkResponse({
    type: [Student],
  })
  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this._studentService.getAllStudents();
  }
}

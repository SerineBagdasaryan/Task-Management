import { Controller, Get, Post, Body} from '@nestjs/common';
import {StudentService} from './students.service';
import {CreateStudentDto} from "@/modules/students/dto/create-student.dto";
import {Student} from "@/modules/students/entities/student.entity";


@Controller('students')
export class StudentsController {
  constructor(private readonly _studentService: StudentService) {}
  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this._studentService.createStudent(createStudentDto);
  }

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this._studentService.getAllStudents();
  }

}

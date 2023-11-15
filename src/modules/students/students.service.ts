import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Student} from "@/modules/students/entities/student.entity";
import {Course} from "@/modules/courses/entities/course.entity";
import {CreateStudentDto} from "@/modules/students/dto/create-student.dto";


@Injectable()
export class StudentService {
  constructor(
      @InjectRepository(Student)
      private readonly _studentRepository: Repository<Student>,
      @InjectRepository(Course)
      private readonly _courseRepository: Repository<Course>,
  ) {}

  async getAllStudents(): Promise<Student[]> {
    return this._studentRepository.find({ relations: ['courses'] });
  }


  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { name, courseIds } = createStudentDto;
    const student = this._studentRepository.create({ name });

    if (courseIds && courseIds.length > 0) {
      const courses = await this._courseRepository.findByIds(courseIds);
      student.courses = courses;
    }

    return this._studentRepository.save(student);
  }

}

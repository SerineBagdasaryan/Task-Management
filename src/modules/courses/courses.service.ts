import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import {Course} from "@/modules/courses/entities/course.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Student} from "@/modules/students/entities/student.entity";

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course)
                private readonly _courseRepository: Repository<Course>,
              @InjectRepository(Student)
              private readonly _studentRepository: Repository<Student>,
  ) {
  }
  async getAllCourses(): Promise<Course[]> {
    return this._courseRepository.find({ relations: ['students'] });
  }
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const { name, studentIds } = createCourseDto;
    const course = this._courseRepository.create({ name });

    if (studentIds && studentIds.length > 0) {
      const students = await this._studentRepository.findByIds(studentIds);
      course.students = students;
    }

    return this._courseRepository.save(course);
  }
}

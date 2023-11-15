import {forwardRef, Module} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Course} from "@/modules/courses/entities/course.entity";
import {StudentsModule} from "@/modules/students/students.module";
import {Student} from "@/modules/students/entities/student.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Course, Student]), forwardRef(() => StudentsModule)],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}

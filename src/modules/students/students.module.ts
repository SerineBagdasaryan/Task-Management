import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@/modules/students/entities/student.entity';
import { CoursesModule } from '@/modules/courses/courses.module';
import { Course } from '@/modules/courses/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Course]),
    forwardRef(() => CoursesModule),
  ],
  controllers: [StudentsController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentsModule {}

import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { Course } from '@/modules/courses/entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultValue } from '@common/utils/default-value';

@Entity()
export class Student extends BaseEntity {
  @ApiProperty({
    type: String,
    description: DefaultValue.firstName,
  })
  @Column()
  name: string;

  @ApiProperty({
    type: Course,
    isArray: true,
    description: 'An array of courses associated with the student.',
  })
  @ManyToMany(() => Course, { cascade: true })
  @JoinTable()
  courses: Course[];
}

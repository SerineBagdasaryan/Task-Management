import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { Student } from '@/modules/students/entities/student.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultValue } from '@common/utils/default-value';

@Entity()
export class Course extends BaseEntity {
  @ApiProperty({
    type: String,
    description: DefaultValue.firstName,
  })
  @Column()
  name: string;

  @ApiProperty({
    type: Student,
    isArray: true,
    description: 'An array of student associated with the courses.',
  })
  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
}

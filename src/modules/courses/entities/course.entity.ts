import { Entity, Column, ManyToMany } from 'typeorm';
import {BaseEntity} from "@/common/entities/base.entity";
import {Student} from "@/modules/students/entities/student.entity";

@Entity()
export class Course extends BaseEntity{
    @Column()
    name: string;

    @ManyToMany(() => Student, student => student.courses)
    students: Student[];
}
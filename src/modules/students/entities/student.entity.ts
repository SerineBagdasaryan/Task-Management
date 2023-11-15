import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import {BaseEntity} from "@/common/entities/base.entity";
import {Course} from "@/modules/courses/entities/course.entity";

@Entity()
export class Student extends BaseEntity{
    @Column()
    name: string;

    @ManyToMany(() => Course, { cascade: true })
    @JoinTable()
    courses: Course[];
}
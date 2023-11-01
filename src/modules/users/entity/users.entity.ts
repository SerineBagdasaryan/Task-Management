import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {BaseEntity} from "../../../common/entities/base.entity";

@Entity()
export class User extends BaseEntity {

   @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;
}

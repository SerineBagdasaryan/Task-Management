import {Entity, Column, OneToMany} from 'typeorm';
import {BaseEntity} from "../../../common/entities/base.entity";
import {Role} from "../../../common/enums/role.enum";
import {Task} from "../../tasks/entities/task.entity";

@Entity()
export class User extends BaseEntity {

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({
        name: "first_name"
    })
    firstName: string;

    @Column({
        name: "last_name"
    })
    lastName: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];
}

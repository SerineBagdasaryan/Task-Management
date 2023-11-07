import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {TaskStatus} from "../enum/task-status.enum";
import {User} from "../../users/entities/users.entity";
import {BaseEntity} from "../../../common/entities/base.entity";
@Entity()
export class Task extends BaseEntity{
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
    status: TaskStatus;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    name: "due_date"
    })
    dueDate: Date;

    @Column({
        name: "user_id"
    })
    userId: number;

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({name: 'user_id'})
    user: User;
}
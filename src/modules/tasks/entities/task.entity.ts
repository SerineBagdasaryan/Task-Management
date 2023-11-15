import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {TaskStatus} from "../enum/task-status.enum";
import {User} from "../../users/entities/users.entity";
import {BaseEntity} from "../../../common/entities/base.entity";
import {ApiProperty} from "@nestjs/swagger";
import {DefaultValue} from "@/common/utils/default-value";
@Entity()
export class Task extends BaseEntity {

    @ApiProperty({
        type: String,
        default: DefaultValue.title
    })
    @Column()
    title: string;

    @ApiProperty({
        type: String,
        default: DefaultValue.title
    })
    @Column()
    description: string;

    @ApiProperty({
        enum: TaskStatus,
        default: TaskStatus.TODO
    })

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
    status: TaskStatus;

    @ApiProperty({
        type: Date,
        default: new Date()
    })
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    name: "due_date"
    })
    dueDate: Date;

    @ApiProperty({
        type: Number,
        default: DefaultValue.id
    })
    @Column({
        name: "user_id"
    })
    userId: number;


    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({name: 'user_id'})
    user: User;
}
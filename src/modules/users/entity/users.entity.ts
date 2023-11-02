import {Entity, Column} from 'typeorm';
import {BaseEntity} from "../../../common/entities/base.entity";
import {Role} from "../../../common/enums/role.enum";

@Entity()
export class User extends BaseEntity {

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;
}

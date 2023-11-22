import {Entity, Column} from 'typeorm';
import {BaseEntity} from "@/common/entities/base.entity";


@Entity()
export class UsersToken extends BaseEntity {
    @Column()
    token: string;

    @Column()
    userId: number;
}


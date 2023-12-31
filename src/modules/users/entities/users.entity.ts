import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { Role } from '@common/enums/role.enum';
import { Task } from '../../tasks/entities/task.entity';
import { DefaultValue } from '@common/utils/default-value';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Files } from '@modules/files/entities/file.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    type: String,
    default: DefaultValue.email,
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    type: String,
    default: DefaultValue.password,
  })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    type: String,
    default: DefaultValue.firstName,
  })
  @Column({
    name: 'first_name',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    default: DefaultValue.lastName,
  })
  @Column({
    name: 'last_name',
  })
  lastName: string;

  @ApiProperty({
    enum: Role,
    default: Role.USER,
  })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @ApiProperty({ type: () => Task, isArray: true })
  @OneToMany(() => Task, task => task.user)
  tasks: Task[];

  @ApiProperty({
    type: Number,
    default: DefaultValue.id,
  })
  @Column({
    name: 'image_id',
    default: null,
  })
  imageId: number;

  @ApiProperty({ type: () => Files })
  @OneToOne(() => Files, { cascade: true, eager: true })
  @JoinColumn({ name: 'image_id' })
  file: Files;
}

import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as TypeORMBaseEntity,
  Entity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export abstract class BaseEntity extends TypeORMBaseEntity {
  @ApiProperty({
    type: Number,
    default: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: Date,
    default: new Date(),
  })
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    default: new Date(),
  })
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

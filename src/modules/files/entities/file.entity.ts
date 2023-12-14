import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '@common/entities';
import { User } from '@modules/users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DefaultValue } from '@common/utils/default-value';

@Entity()
export class Files extends BaseEntity {
  @ApiProperty({
    type: String,
    default: DefaultValue.filename,
  })
  @Column()
  imagePath: string;

  @OneToOne(() => User, user => user.file)
  user: User;
}

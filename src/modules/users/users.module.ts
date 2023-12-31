import { Module } from '@nestjs/common';
import { UserRepository } from './entities/users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { TasksModule } from '@modules';
import { FilesModule } from '@modules/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    TasksModule,
    FilesModule,
  ],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}

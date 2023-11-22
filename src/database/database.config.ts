import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from "@/modules/users/entities/users.entity";
import {Task} from "@/modules/tasks/entities/task.entity";
import {Student} from "@/modules/students/entities/student.entity";
import {Course} from "@/modules/courses/entities/course.entity";
import {UsersToken} from "@/modules/users/entities/users-token.entity";
import {addTransactionalDataSource} from "typeorm-transactional";
import {DataSource} from "typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [User, Task, Student, Course, UsersToken],
                synchronize: true,
            }),
            inject: [ConfigService],
            async dataSourceFactory(options) {
                if (!options) {
                    throw new Error('Invalid options passed');
                }

                return addTransactionalDataSource(new DataSource(options));
            },
        }),
    ]
})
export class DatabaseModule {}
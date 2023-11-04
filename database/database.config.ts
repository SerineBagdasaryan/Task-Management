import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "../src/modules/users/entities/users.entity";
import {Task} from "../src/modules/tasks/entities/task.entity";


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
                entities: [User, Task],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "./database/database.config";
import * as Joi from 'joi'
import {UsersModule} from "./modules/users/users.module";
import {AuthModule} from "./modules/auth/auth.module";
import {AuthMiddleware} from "./common/middlewares/auth.middleware";
import {TasksModule} from "./modules/tasks/tasks.module";
import {StudentsModule} from "@/modules/students/students.module";
import {CoursesModule} from "@/modules/courses/courses.module";
import {CacheModule} from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
            }),
        }),
        DatabaseModule,
        UsersModule,
        AuthModule,
        TasksModule,
        StudentsModule,
        CoursesModule,
        CacheModule.registerAsync({
            imports: [ConfigModule],
            isGlobal: true,
            useFactory: async (configService: ConfigService) => ({
                store: await redisStore({
                    socket: {
                        host: configService.get<string>('REDIS_HOST'),
                        port: configService.get<number>('REDIS_PORT'),
                    },
                }),
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users', 'tasks', { path: 'auth/password', method: RequestMethod.PATCH });
}
}

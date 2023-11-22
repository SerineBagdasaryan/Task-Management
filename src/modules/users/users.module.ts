import {Module} from "@nestjs/common";
import {UserRepository} from "./entities/users.repository";
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/users.entity";
import {TasksModule} from "../tasks/tasks.module";
import {UsersToken} from "@/modules/users/entities/users-token.entity";
import {UsersTokenRepository} from "@/modules/users/entities/users-token.repository";



@Module({
    imports: [TypeOrmModule.forFeature([User, UsersToken]),
        ConfigModule, TasksModule
    ],
    providers: [UsersService, UserRepository, UsersTokenRepository],
    controllers: [UsersController],
    exports: [UsersService, UserRepository, UsersTokenRepository]
})
export class UsersModule {
}
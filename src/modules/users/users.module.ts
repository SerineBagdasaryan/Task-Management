import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from "./entity/users.entity";
import {UserRepository} from "./entity/users.repository";
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {ConfigModule} from "@nestjs/config";



@Module({
    imports: [TypeOrmModule.forFeature([User]),
        ConfigModule
    ],
    providers: [UsersService, UserRepository],
    controllers: [UsersController],
    exports: [UsersService, UserRepository]
})
export class UsersModule {
}
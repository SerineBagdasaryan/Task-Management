import {Controller, Get} from '@nestjs/common';
import {User} from "./entities/users.entity";
import {User as UserDecorator} from "@Decorator/user.decorator"
import {UsersService} from "./users.service";


@Controller('users')
export class UsersController {
    constructor(private readonly _usersService: UsersService) {
    }


    @Get('profile')
    async findOne(@UserDecorator() user: User): Promise<User> {
        return user;
    }

    @Get('stat')
    async getStat(@UserDecorator() user: User): Promise<number> {
        return this._usersService.getStat(user.id);
    }

}

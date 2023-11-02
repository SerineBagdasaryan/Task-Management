import {Controller, Get} from '@nestjs/common';
import {User} from "./entity/users.entity";
import {User as UserDecorator} from "../../common/decorators/user.decorator"


@Controller('users')
export class UsersController {
    constructor() {
    }


    @Get('profile')
    async findOne(@UserDecorator() user: User): Promise<User> {
        return user;
    }

}

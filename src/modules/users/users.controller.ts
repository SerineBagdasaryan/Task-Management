import {Controller, Get} from '@nestjs/common';
import {User} from "./entities/users.entity";
import {User as UserDecorator} from "@Decorator/user.decorator"
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {DefaultValue} from "@/common/utils/default-value";
import {TitleValue} from "./utils/title-value";



@ApiTags(DefaultValue.title)
@Controller('users')
export class UsersController {
    constructor(private readonly _usersService: UsersService) {
    }

    @ApiOperation({ summary: TitleValue.getProfile})
    @ApiResponse({
        type: User,
        status: 200
    })
    @Get('profile')
    async findOne(@UserDecorator() user: User): Promise<User> {
        return user;
    }

    @ApiOperation({ summary: TitleValue.getStat })
    @ApiResponse({
        type: Number,
        status: 200
    })
    @Get('stat')
    async getStat(@UserDecorator() user: User): Promise<number> {
        return this._usersService.getStat(user.id);
    }

}

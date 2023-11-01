import {Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthGuard} from '../../common/guards/auth.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly _usersService: UsersService) {
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}

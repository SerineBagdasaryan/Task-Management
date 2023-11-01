import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserDto} from "./dto/user.dto";
import {User} from './entity/users.entity';
import {AuthGuard} from '../../common/guards/auth.guard';
import {TokenResponseDto} from "./dto/token-response.dto";


@Controller('users')
export class UsersController {
    constructor(private readonly _usersService: UsersService) {
    }

    @Post('register')
    async register(@Body() userDto: UserDto): Promise<User> {
        return await this._usersService.createUser(userDto);
    }

    @Post('login')
    async login(@Body() userDto: UserDto): Promise<TokenResponseDto> {
        return this._usersService.login(userDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}

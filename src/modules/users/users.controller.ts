import { Controller, Get } from '@nestjs/common';
import { User } from './entities/users.entity';
import { User as UserDecorator } from '@Decorator/user.decorator';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TitleValue } from './utils/title-value';

@ApiTags(TitleValue.title)
@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @ApiOperation({ summary: TitleValue.getProfile })
  @ApiOkResponse({
    type: User,
  })
  @Get('profile')
  async findOne(@UserDecorator() user: User): Promise<User> {
    return user;
  }

  @ApiOperation({ summary: TitleValue.getStat })
  @ApiOkResponse({
    type: Number,
  })
  @Get('stat')
  async getStat(@UserDecorator() user: User): Promise<number> {
    return this._usersService.getStat(user.id);
  }
}

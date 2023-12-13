import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  UploadedFile,
} from '@nestjs/common';
import { User } from './entities/users.entity';
import { User as UserDecorator } from '@Decorator/user.decorator';
import { UsersService } from './users.service';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TitleValue } from './utils/title-value';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto';
import { ItemResponseTypeDecorator } from '@common/decorators';
import { STATUS_CODES } from 'http';
import { UploadFile } from '@Decorator/file-upload.decorator';

@ApiTags(TitleValue.title)
@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @ApiOperation({ summary: TitleValue.getProfile })
  @ItemResponseTypeDecorator(User, HttpStatus.OK, STATUS_CODES[HttpStatus.OK])
  @Get('profile')
  async findOne(@UserDecorator() user: User): Promise<User> {
    return this._usersService.findOne(user.id);
  }

  @ApiOperation({ summary: TitleValue.updateProfile })
  @ItemResponseTypeDecorator(User, HttpStatus.OK, STATUS_CODES[HttpStatus.OK])
  @Patch('profile')
  @UploadFile('image')
  async update(
    @UserDecorator() user: User,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return this._usersService.update(user.id, updateUserDto, file);
  }

  @ApiOperation({ summary: TitleValue.getStat })
  @ApiOkResponse({
    type: Number,
  })
  @ApiExcludeEndpoint()
  @Get('stat')
  async getStat(@UserDecorator() user: User): Promise<number> {
    return this._usersService.getStat(user.id);
  }
}

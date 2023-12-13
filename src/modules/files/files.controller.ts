import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { TitleValue } from './utils/title-value';
import { ItemResponseTypeDecorator } from '@common/decorators';
import { STATUS_CODES } from 'http';
import { Files } from '@modules/files/entities/file.entity';
@ApiTags(TitleValue.title)
@Controller('files')
export class FilesController {
  @ItemResponseTypeDecorator(Files, HttpStatus.OK, STATUS_CODES[HttpStatus.OK])
  @Get(':fileName')
  async getFile(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ): Promise<void> {
    return res.sendFile(fileName, { root: './uploads' });
  }
}

import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TitleValue } from './utils/title-value';
@ApiTags(TitleValue.title)
@Controller('files')
export class FilesController {}

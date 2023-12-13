import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from '@modules/files/entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly _fileRepository: Repository<Files>,
  ) {}
  async create(createFileDto: CreateFileDto): Promise<Files> {
    return await this._fileRepository.save(
      this._fileRepository.create({
        ...createFileDto,
      }),
    );
  }
}

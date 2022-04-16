import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { ENUM_STATUS_CODE_ERROR } from 'src/utils';
import { Response } from 'src/utils';
@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  @Response('file.upload.success')
  async uploadFile(file): Promise<FileEntity> {
    if (!file) {
      throw new HttpException(
        {
          statusCode: ENUM_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
          message: 'request.selectFile'
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = {
      local: `/${this.configService.get('app.apiPrefix')}/v1/${file.path}`,
      s3: file.location,
    };

    return this.fileRepository.save(
      this.fileRepository.create({
        path: path[this.configService.get('file.driver')],
      }),
    );
  }
}

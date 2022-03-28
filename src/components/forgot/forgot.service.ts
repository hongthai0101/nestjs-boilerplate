import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base';
import { Repository } from 'typeorm';
import { ForgotEntity } from './entities';

@Injectable()
export class ForgotService extends BaseService<ForgotEntity> {
  constructor(
    @InjectRepository(ForgotEntity)
    protected repository: Repository<ForgotEntity>,
  ) {
    super(repository);
  }
}

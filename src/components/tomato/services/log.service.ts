import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { LogEntity } from '../entities';

export class LogService extends BaseService<LogEntity> {
  constructor(
    @InjectRepository(LogEntity)
    protected repository: Repository<LogEntity>,
  ) {
    super(repository);
  }
}

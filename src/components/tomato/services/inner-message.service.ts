import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { InnerMessageEntity } from '../entities';

export class InnerMessageService extends BaseService<InnerMessageEntity> {
  constructor(
    @InjectRepository(InnerMessageEntity)
    protected repository: Repository<InnerMessageEntity>,
  ) {
    super(repository);
  }
}

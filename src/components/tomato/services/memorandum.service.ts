import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { MemorandumEntity } from '../entities';

export class MemorandumService extends BaseService<MemorandumEntity> {
  constructor(
    @InjectRepository(MemorandumEntity)
    protected repository: Repository<MemorandumEntity>,
  ) {
    super(repository);
  }
}

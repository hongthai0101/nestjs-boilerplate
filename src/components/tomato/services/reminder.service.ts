import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { ReminderEntity } from '../entities';

export class ReminderService extends BaseService<ReminderEntity> {
  constructor(
    @InjectRepository(ReminderEntity)
    protected repository: Repository<ReminderEntity>,
  ) {
    super(repository);
  }
}

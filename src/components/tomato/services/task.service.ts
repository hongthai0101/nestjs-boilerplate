import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { TaskEntity } from '../entities';

export class TaskService extends BaseService<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    protected repository: Repository<TaskEntity>,
  ) {
    super(repository);
  }
}

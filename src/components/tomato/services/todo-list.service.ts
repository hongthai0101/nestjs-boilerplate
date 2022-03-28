import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { TodoListEntity } from '../entities';

export class TodoListService extends BaseService<TodoListEntity> {
  constructor(
    @InjectRepository(TodoListEntity)
    protected repository: Repository<TodoListEntity>,
  ) {
    super(repository);
  }
}

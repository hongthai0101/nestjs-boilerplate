import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { UserConfigureEntity } from '../entities';

export class UserConfigureService extends BaseService<UserConfigureEntity> {
  constructor(
    @InjectRepository(UserConfigureEntity)
    protected repository: Repository<UserConfigureEntity>,
  ) {
    super(repository);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base';
import { Repository } from 'typeorm';
import { CapitalFlowTypeEntity } from '../entities';

export class CapitalFlowTypeService extends BaseService<CapitalFlowTypeEntity> {
  constructor(
    @InjectRepository(CapitalFlowTypeEntity)
    protected repository: Repository<CapitalFlowTypeEntity>,
  ) {
    super(repository);
  }
}

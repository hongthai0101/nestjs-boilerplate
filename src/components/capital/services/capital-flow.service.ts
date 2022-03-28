import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CapitalFlowEntity, CapitalFlowTypeEntity } from '../entities';
import { BaseService } from 'src/base';

export class CapitalFlowService extends BaseService<CapitalFlowEntity> {
  constructor(
    @InjectRepository(CapitalFlowEntity)
    protected repository: Repository<CapitalFlowEntity>,
  ) {
    super(repository);
  }

  public async findAmountGroup() {

    return this.repository.createQueryBuilder('F')
    .innerJoin(CapitalFlowTypeEntity, 'T')
    .getMany();

  }
}

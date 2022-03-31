import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CapitalFlowEntity, CapitalFlowTypeEntity } from '../entities';
import { BaseService } from 'src/base';
import { groupBy } from 'rxjs';

export class CapitalFlowService extends BaseService<CapitalFlowEntity> {
  constructor(
    @InjectRepository(CapitalFlowEntity)
    protected repository: Repository<CapitalFlowEntity>,
  ) {
    super(repository);
  }

  public async findAmountGroup(startDate: string, endDate: string) {
    return this.repository
    .createQueryBuilder('F')
    .select('SUM(F.price) as amount, T.type, T.name')
    .innerJoin(CapitalFlowTypeEntity, 'T', 'F.typeId = T.id')
    .where('F.uid = :uid', {uid: this.auth.id})
    .andWhere('F.createdAt >= :startDate', {startDate})
    .andWhere('F.createdAt <= :endDate', {endDate})
    .groupBy('T.type')
    .addGroupBy('T.name')
    .getRawMany();
  }

  public async findSumPriceByDate(startDate: string, endDate: string) {
    
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base';
import { CompanyEntity } from '../entities';

export class CompanyService extends BaseService<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyEntity)
    protected repository: Repository<CompanyEntity>,
  ) {
    super(repository);
  }
}

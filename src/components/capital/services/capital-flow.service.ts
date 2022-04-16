import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Like, Repository } from 'typeorm';
import { CapitalFlowEntity, CapitalFlowTypeEntity } from '../entities';
import { BaseService } from 'src/base';
import { IPaginationResponse, validateRelation } from 'src/utils';
import { HelperDateService } from 'src/helper/service';
import moment from 'moment';

export type ICalculateFundResult = {
  income: number | string,
  consumption: number | string,
  available: number | string
}

export type ISumPriceByDateResult = {
  date: string,
  name: string,
  price: number
  type: number
}
export class CapitalFlowService extends BaseService<CapitalFlowEntity> {
  constructor(
    @InjectRepository(CapitalFlowEntity)
    protected repository: Repository<CapitalFlowEntity>,
    private dateService: HelperDateService,
  ) {
    super(repository);
  }

  /**
   * 
   * @param startDate 
   * @param endDate 
   * @returns 
   */
  public async findAmountGroup(
    startDate: string, 
    endDate: string
  ) {
    return this.repository
      .createQueryBuilder('F')
      .select('SUM(F.price) as amount, T.type, T.name')
      .innerJoin(CapitalFlowTypeEntity, 'T', 'F.typeId = T.id')
      .where('F.uid = :uid', { uid: this.auth.id })
      .andWhere('F.createdAt >= :startDate', { startDate })
      .andWhere('F.createdAt <= :endDate', { endDate })
      .groupBy('T.type')
      .addGroupBy('T.name')
      .getRawMany();
  }

  /**
   * 
   * @param startDate 
   * @param endDate 
   * @returns 
   */
  public async findSumPriceByDate(
    startDate: string, 
    endDate?: string
  ): Promise<ISumPriceByDateResult[]> {

    startDate = startDate || moment().startOf('hour').subtract(7, 'd').format('YYYY-MM-DD')
    endDate = endDate || moment().format('YYYY-MM-DD')

    const result = await this.repository
      .createQueryBuilder('F')
      .select(`SUM(F.price) as amount, T.type, to_date("F"."createdAt"::TEXT, 'YYYY-MM-DD') AS date`)
      .innerJoin(CapitalFlowTypeEntity, 'T', 'F.typeId = T.id')
      .where('F.uid = :uid', { uid: this.auth.id })
      .andWhere(`to_date("F"."createdAt"::TEXT, 'YYYY-MM-DD') >= :startDate`, { startDate })
      .andWhere(`to_date("F"."createdAt"::TEXT, 'YYYY-MM-DD') <= :endDate`, { endDate })
      .groupBy('T.type')
      .addGroupBy('F.createdAt')
      .orderBy('F.createdAt')
      .getRawMany();

    const durations = this.dateService.diff(startDate, endDate, 'days');
    const data: ISumPriceByDateResult[] = []

    for (let i = 0; i < durations; i++) {
      const date = this.dateService.forwardInDays(startDate, i);
      const payload: ISumPriceByDateResult = {
        date: this.dateService.toString(date),
        price: 0,
        name: 'income',
        type: 1
      }
      data.push(payload, {
        ...payload,
        name: 'expenditure',
        type: 2
      })
    }
    
    result.forEach(item => {
      const idx = data.findIndex(el => this.dateService.isSame(el.date, item.date))
      
      if (~idx) {
        if (item.type === 1) {
          data[idx].price = item.amount
        } else {
          data[idx + 1].price = item.amount
        }
      }
    })
    return data
  }

  /**
   * 
   * @param filter 
   * @param startDate 
   * @param endDate 
   * @param type 
   * @param keyword 
   * @param typeName 
   * @returns 
   */
  public async findAndCountByUid(
    filter: FindManyOptions<CapitalFlowEntity>,
    startDate: Date,
    endDate: Date,
    type: number,
    keyword: string,
    typeName: string
  ): Promise<IPaginationResponse> {
    const { relations } = filter;
    if (relations) validateRelation(relations as string[], ['type']);

    const filterParams = this.handleFilter(filter, startDate, endDate, type, keyword, typeName);

    const [items, total] = await Promise.all([
      this.find(filterParams),
      this.count(filterParams)
    ]);
    return { items, total }
  }

  /**
   * 
   * @param startDate 
   * @param endDate 
   * @param type 
   * @param keyword 
   * @param typeName 
   * @returns 
   */
  public async calculateFunds(
    startDate: Date,
    endDate: Date,
    type: number,
    keyword: string,
    typeName: string
  ): Promise<ICalculateFundResult> {
    const builder = this.repository
      .createQueryBuilder('F')
      .select('SUM(F.price) as price, T.type')
      .innerJoin(CapitalFlowTypeEntity, 'T', 'F.typeId = T.id')
      .where('F.uid = :uid', { uid: this.auth.id })
      .andWhere('F.createdAt >= :startDate', { startDate })
      .andWhere('F.createdAt <= :endDate', { endDate });

    if (typeName) builder.andWhere('F.typeId = :typeName', { typeName })
    if (type) builder.andWhere('T.type = :type', { type })
    if (keyword) builder.andWhere('F.remark = :remark', { remark: `%${keyword}%` })

    const result = await builder.groupBy('T.type').getRawMany();

    const amountParams: ICalculateFundResult = {
      consumption: 0,
      income: 0,
      available: 0
    }

    result.forEach(item => {
      if (item.type === 1) {
        amountParams.income = item.price
      } else {
        amountParams.consumption = item.price
      }
      return item
    })

    amountParams.available = (+amountParams.income - +amountParams.consumption).toFixed(2);
    return amountParams
  }

  /**
   * 
   * @param filter 
   * @param startDate 
   * @param endDate 
   * @param type 
   * @param keyword 
   * @param typeName 
   * @returns 
   */
  private handleFilter(
    filter: FindManyOptions<CapitalFlowEntity>,
    startDate: Date,
    endDate: Date,
    type: number,
    keyword: string,
    typeName: string
  ): FindManyOptions<CapitalFlowEntity> {
    const where = { uid: this.auth.id };
    if (startDate && endDate)
      Object.assign(where, { createdAt: Between(startDate, endDate) });
    if (type) Object.assign(where, { type: { type } });
    if (typeName) Object.assign(where, { type: { id: typeName } });
    if (keyword) Object.assign(where, { remark: Like(`${keyword}`) });

    return { ...filter, where }
  }
}

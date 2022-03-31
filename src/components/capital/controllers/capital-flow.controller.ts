import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CapitalFlowService } from '../services';
import {
  CreateCapitaFlowDto,
  FlowPaginationDto,
  UpdateCapitalFlowDto,
} from '../dto';
import { CapitalFlowEntity } from '../entities';
import { Response, validateRelation, IPaginationResponse } from 'src/utils';
import { Between } from 'typeorm';
import { IsDateString } from 'class-validator';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Capital Flow')
@Controller({
  path: 'capital-flows',
  version: '1',
})
export class CapitalFlowController {
  constructor(private readonly flowService: CapitalFlowService) {}

  @Response('common.create.success')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() params: CreateCapitaFlowDto) {
    return this.flowService.create(params);
  }

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() { startDate, endDate, type, filter }: FlowPaginationDto,
  ): Promise<IPaginationResponse> {
    const { relations } = filter;
    if (relations) validateRelation(relations, ['type']);

    const where = {};
    if (startDate && endDate)
      Object.assign(where, { createdAt: Between(startDate, endDate) });
    if (type) Object.assign(where, { type: { id: type } });

    const items = await this.flowService.find({ ...filter, where });
    const total = await this.flowService.count({ where });
    return {
      items,
      total,
    };
  }

  @Response('common.find.success')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<CapitalFlowEntity> {
    const filterRelations = relations ? relations.split(',') : [];
    if (relations) validateRelation(filterRelations, ['type']);

    return this.flowService.findById(id, { relations: filterRelations });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() params: UpdateCapitalFlowDto) {
    this.flowService.update(id, params);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.flowService.delete(id);
  }

  @Response('common.find.success')
  @Get('/amount/group')
  @HttpCode(HttpStatus.OK)
  async amountGroup(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.flowService.findAmountGroup(startDate, endDate);    
  }

  @Response('common.find.success')
  @Get('/amount/sum')
  @HttpCode(HttpStatus.OK)
  async amountSum(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.flowService.findSumPriceByDate(startDate, endDate);    
  }
}

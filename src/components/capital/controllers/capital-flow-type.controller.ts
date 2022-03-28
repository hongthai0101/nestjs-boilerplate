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
import { CapitalFlowTypeService } from '../services';
import { CreateCapitaFlowTypeDto, UpdateCapitalFlowTypeDto } from '../dto';
import { CapitalFlowTypeEntity } from '../entities';
import { Response, IPaginationResponse, QueryBaseList } from 'src/utils';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Capital Flow Type')
@Controller({
  path: 'capital-flow-types',
  version: '1',
})
export class CapitalFlowTypeController {
  constructor(private readonly flowTypeService: CapitalFlowTypeService) {}

  @Response('common.create.success')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() params: CreateCapitaFlowTypeDto) {
    return this.flowTypeService.create(params);
  }

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() { filter }: QueryBaseList,
  ): Promise<IPaginationResponse> {
    const items = await this.flowTypeService.find(filter);
    const total = await this.flowTypeService.count({});
    return {
      items,
      total,
    };
  }

  @Response('common.find.success')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<CapitalFlowTypeEntity> {
    return this.flowTypeService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() params: UpdateCapitalFlowTypeDto) {
    this.flowTypeService.update(id, params);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.flowTypeService.delete(id);
  }
}

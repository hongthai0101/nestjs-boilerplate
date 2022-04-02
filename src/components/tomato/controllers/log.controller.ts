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
import { LogService } from '../services';
import {
  CreateLogDto,
  FindLogDto,
  UpdateLogDto,
} from '../dto';
import { LogEntity } from '../entities';
import { Response, IPaginationResponse, QueryBaseList } from 'src/utils';
import { User } from 'src/components/auth/auth.decorator';
import { Between } from 'typeorm';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Log')
@Controller({
  path: 'logs',
  version: '1',
})
export class LogController {
  constructor(
    private readonly service: LogService
  ) { }

  @Response('common.create.success')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() params: CreateLogDto) {
    return this.service.create(params);
  }

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() { filter, startDate, endDate, company, logType }: FindLogDto,
    @User('id') uid: number
  ): Promise<IPaginationResponse> {

    const where = {uid};
    if (startDate && endDate)
      Object.assign(where, { createdAt: Between(startDate, endDate) });
    if (logType) Object.assign(where, { logType });
    if (company) Object.assign(where, { company: {id: company} });

    const items = await this.service.find({ ...filter, where });
    const total = await this.service.count({where});
    return {
      items,
      total,
    };
  }

  @Response('common.find.success')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id') id: string
  ): Promise<LogEntity> {
    return this.service.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string, 
    @Body() params: UpdateLogDto
  ) {
    this.service.update(id, params);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.service.delete(id);
  }
}

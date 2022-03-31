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
import { ReminderService } from '../services';
import {
  CreateReminderDto,
  FindReminderDto,
  UpdateReminderDto,
} from '../dto';
import { ReminderEntity } from '../entities';
import { Response, IPaginationResponse } from 'src/utils';
import { Between } from 'typeorm';
import { User } from 'src/components/auth/auth.decorator';
import {  } from 'lodash';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Reminder')
@Controller({
  path: 'reminders',
  version: '1',
})
export class ReminderController {
  constructor(private readonly service: ReminderService) { }

  @Response('common.create.success')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() params: CreateReminderDto) {
    const data = {
      content: params.content,
      createdAt: params.date
    }
    return this.service.create(data);
  }

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() { filter, startDate, endDate, type }: FindReminderDto,
    @User('id') uid: number
  ): Promise<IPaginationResponse> {

    const where = { uid };
    if (startDate && endDate)
      Object.assign(where, { createdAt: Between(startDate, endDate) });
    if (type) Object.assign(where, { type });

    const items = await this.service.find({ ...filter, where });
    const total = await this.service.count({ where });
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
  ): Promise<ReminderEntity> {
    return this.service.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() {content, date, type}: UpdateReminderDto) {
    const data = {
      content,
      createdAt: date
    }
    if(type) Object.assign(data, { type });
    this.service.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.service.delete(id);
  }
}

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
import { Response, IPaginationResponse, QueryBaseList } from 'src/utils';
import { Between } from 'typeorm';
import { User } from 'src/components/auth/auth.decorator';

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
    return this.service.create(params);
  }

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() { filter, startDate, endDate }: FindReminderDto,
    @User('id') id: number
  ): Promise<IPaginationResponse> {

    const where = {
      uid: id
    };
    if (startDate && endDate)
      Object.assign(where, { createdAt: Between(startDate, endDate) });

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
  update(@Param('id') id: string, @Body() params: UpdateReminderDto) {
    this.service.update(id, params);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.service.delete(id);
  }
}

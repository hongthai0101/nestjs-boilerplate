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
import { TaskService } from '../services';
import {
  CreateTaskDto,
  FindTaskDto,
  UpdateTaskDto,
} from '../dto';
import { TaskEntity } from '../entities';
import { Response } from 'src/utils';
import { User } from 'src/components/auth/auth.decorator';
import { Between } from 'typeorm';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Task')
@Controller({
  path: 'tasks',
  version: '1',
})
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Response('common.create.success')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateTaskDto) {    
    return this.service.create(body);
  }

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() { startDate, endDate }: FindTaskDto,
    @User('id') id: number
  ) {
    const where = {
      uid: id
    }
    if (startDate && endDate)
      Object.assign(where, { date: Between(startDate, endDate) });

    const items = await this.service.find({where});
    const data = {
      wait: [],
      process: [],
      finished: [],
      unfinished: []
    }

    items.forEach(item => {
      switch (item.type) {
        case 1:
          data.wait.push(item)
          break
        case 2:
          data.process.push(item)
          break
        case 3:
          data.finished.push(item)
          break
        case 4:
          data.unfinished.push(item)
          break
        default:
      }
    });
    return data;
  }

  @Response('common.find.success')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id') id: string
  ): Promise<TaskEntity> {
    return this.service.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: string, @Body() {rollback}: UpdateTaskDto) {
    const item = await this.service.findById(id);
    const type = rollback ? item.type - 1 : item.type + 1;
    await this.service.update(id, {type});
    return ;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.service.delete(id);
    return ;
  }
}

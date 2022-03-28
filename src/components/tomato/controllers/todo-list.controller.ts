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
import { TodoListService } from '../services';
import {
  CreateTodoListDto,
  UpdateTodoListDto,
  FindTodoListDto,
} from '../dto';
import { TodoListEntity } from '../entities';
import { Response, IPaginationResponse } from 'src/utils';
import { User } from 'src/components/auth/auth.decorator';
import { Between } from 'typeorm';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Todo List')
@Controller({
  path: 'todo-lists',
  version: '1',
})
export class TodoListController {
  constructor(private readonly service: TodoListService) {}

  @Response('common.create.success')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() params: CreateTodoListDto) {
    return this.service.create(params);
  }

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() { filter, startDate, endDate }: FindTodoListDto,
    @User('id') uid: number
  ): Promise<IPaginationResponse> {

    const where = {uid};
    if (startDate && endDate)
      Object.assign(where, { createdAt: Between(startDate, endDate) });

    const items = await this.service.find(filter);
    const total = await this.service.count(filter);
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
  ): Promise<TodoListEntity> {
    return this.service.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() params: UpdateTodoListDto) {
    this.service.update(id, params);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.service.delete(id);
  }
}

import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
  Inject,
  Bind,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'src/utils';
import { CapitalFlowService } from 'src/components/capital/services';
import { ReminderService, TaskService, TodoListService } from '../services';
import moment from 'moment';
import { User } from 'src/components/auth/auth.decorator';
import { In } from 'typeorm';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Common')
@Controller({
  path: '',
  version: '1',
})
export class CommonController {

  constructor(
    private readonly flowService: CapitalFlowService,
    private readonly taskService: TaskService,
    private readonly todoService: TodoListService,
    private readonly reminderService: ReminderService,
  ) {}

  @Response('common.find.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async index() {
    return 'Welcome to Tomaro Work !';
  }

  @Response('common.find.success')
  @Get('/captcha')
  @HttpCode(HttpStatus.OK)
  async captcha() {
    return '1234';
  }

  @Response('common.find.success')
  @Get('/panel')
  @HttpCode(HttpStatus.OK)
  async panel(@User('id') uid: number
  ) {
    let [price, todayTask, unfinishedTodoList, reminder] = await Promise.all([
      this.flowService.findSumPriceByDate(moment().format('YYYY-MM-DD')),
      this.taskService.find({ where: {type: In([1, 2]), uid} }),
      this.todoService.count({where: {status: 1}, order: {createdAt: 'DESC'}}),
      this.reminderService.count({where: {uid, type: 1}})
    ])

    price = price.filter(item => item.type === 2)
    return {
      consumption: price.length > 0 ? price[0].price : '0.00',
      todayTaskCount: todayTask.length,
      unfinishedTodoListCount: unfinishedTodoList,
      reminderCount: reminder
    };
  }
}

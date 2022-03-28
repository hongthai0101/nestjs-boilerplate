import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'src/utils';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Common')
@Controller({
  path: '',
  version: '1',
})
export class CommonController {

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
  async panel() {
    return {
      consumption: 1,
      todayTaskCount: 2,
      unfinishedTodoListCount: 3,
      reminderCount: 4
    };
  }
}

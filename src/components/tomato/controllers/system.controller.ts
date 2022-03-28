import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import os from 'os';
import { Response } from 'src/utils';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('System')
@Controller({
  path: 'systems',
  version: '1',
})
export class SystemController {

  @Response('common.find.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const info = {
      mysqlVersion: 5,
      currentSystemTime: Date.now(),
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      platform: os.platform(),
      type: os.type(),
      hostname: os.hostname(),
      arch: os.arch(),
      nodeVersion: process.version,
      cpus: os.cpus(),
    };
    return info;
  }
}

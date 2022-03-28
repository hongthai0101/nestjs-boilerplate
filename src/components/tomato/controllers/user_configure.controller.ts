import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserConfigureService } from '../services';
import { Response } from 'src/utils';
import { User } from 'src/components/auth/auth.decorator';
import { UpdateUserConfigureDto } from '../dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User Configure')
@Controller({
  path: 'configures',
  version: '1',
})
export class UserConfigureController {
  constructor(private readonly service: UserConfigureService) {}

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@User('id') id: number) {
    return this.service.find({where: {uid: id}});
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() params: UpdateUserConfigureDto) {
    this.service.update(id, params);
  }
}

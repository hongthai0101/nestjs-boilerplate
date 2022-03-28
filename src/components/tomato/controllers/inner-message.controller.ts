import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InnerMessageService } from '../services';
import { Response, IPaginationResponse, QueryBaseList } from 'src/utils';
import { User } from 'src/components/auth/auth.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Inner Message')
@Controller({
  path: 'inner-messages',
  version: '1',
})
export class InnerMessageController {
  constructor(private readonly service: InnerMessageService) {}

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() { filter }: QueryBaseList,
    @User('id') uid: number
  ): Promise<IPaginationResponse> {
    filter = {...filter, where: {uid}}
    const items = await this.service.find(filter);
    const total = await this.service.count(filter);
    return {
      items,
      total,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @User('id') uid: number
  ) {
    this.service.updateBy({uid, id}, {
      hasRead: true
    });
  }
}

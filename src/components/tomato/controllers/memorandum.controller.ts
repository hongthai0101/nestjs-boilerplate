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
import { MemorandumService } from '../services';
import {
  CreateMemorandumDto,
  UpdateMemorandumDto,
} from '../dto';
import { MemorandumEntity } from '../entities';
import { Response, IPaginationResponse, QueryBaseList } from 'src/utils';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Memorandum')
@Controller({
  path: 'memorandums',
  version: '1',
})
export class MemorandumController {
  constructor(private readonly service: MemorandumService) {}

  @Response('common.create.success')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() params: CreateMemorandumDto) {
    return this.service.create(params);
  }

  @Response('common.list.success')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() { filter }: QueryBaseList,
  ): Promise<IPaginationResponse> {
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
  ): Promise<MemorandumEntity> {
    return this.service.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string, 
    @Body() params: UpdateMemorandumDto
  ) {
    this.service.update(id, params);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.service.delete(id);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperDateService } from 'src/helper/service';
import {
  CapitalFlowController,
  CapitalFlowTypeController,
} from './controllers';
import { CapitalFlowTypeEntity, CapitalFlowEntity } from './entities';
import { CapitalFlowService, CapitalFlowTypeService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([CapitalFlowEntity, CapitalFlowTypeEntity]),
    HelperDateService
  ],
  controllers: [CapitalFlowController, CapitalFlowTypeController],
  providers: [CapitalFlowService, CapitalFlowTypeService],
})
export class CapitalModule {}

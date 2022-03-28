import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CapitalFlowController,
  CapitalFlowTypeController,
} from './controllers';
import { CapitalFlowTypeEntity, CapitalFlowEntity } from './entities';
import { CapitalFlowService, CapitalFlowTypeService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([CapitalFlowEntity, CapitalFlowTypeEntity]),
  ],
  controllers: [CapitalFlowController, CapitalFlowTypeController],
  providers: [CapitalFlowService, CapitalFlowTypeService],
})
export class CapitalModule {}

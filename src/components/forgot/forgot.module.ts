import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotEntity } from './entities/forgot.entity';
import { ForgotService } from './forgot.service';

@Module({
  imports: [TypeOrmModule.forFeature([ForgotEntity])],
  providers: [ForgotService],
  exports: [ForgotService],
})
export class ForgotModule {}

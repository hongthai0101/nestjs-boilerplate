import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonController, InnerMessageController, LogController, MemorandumController, ReminderController, SystemController, TaskController, TodoListController, UserConfigureController } from './controllers';
import { InnerMessageEntity, LogEntity, MemorandumEntity, ReminderEntity, TaskEntity, TodoListEntity, UserConfigureEntity } from './entities';
import { InnerMessageService, LogService, MemorandumService, ReminderService, TaskService, TodoListService, UserConfigureService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InnerMessageEntity,
      LogEntity,
      MemorandumEntity,
      ReminderEntity,
      TaskEntity,
      TodoListEntity,
      UserConfigureEntity
    ])],
  controllers: [
    InnerMessageController,
    LogController,
    MemorandumController,
    ReminderController,
    TaskController,
    TodoListController,
    UserConfigureController, 
    SystemController,
    CommonController
  ],
  providers: [
    InnerMessageService,
    LogService,
    MemorandumService,
    ReminderService,
    TaskService,
    TodoListService,
    UserConfigureService
  ],
})
export class TomatoModule { }

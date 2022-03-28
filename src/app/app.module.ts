import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { ComponentModule } from 'src/components/component.module';
import { appConfig, appleConfig, authConfig, databaseConfig, facebookConfig, fileConfig, googleConfig, mailConfig, middlewareConfig, twitterConfig } from 'src/config';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { DebuggerModule, DebuggerOptionService } from 'src/debugger';
import { HelperModule } from 'src/helper/helper.module';
import { HomeModule } from 'src/home/home.module';
import { MessageModule } from 'src/i18n/message.module';
import { MailConfigService } from 'src/mail/mail-config.service';
import { MailModule } from 'src/mail/mail.module';
import { MiddlewareModule } from 'src/middleware/middleware.module';

@Module({
  imports: [
    MiddlewareModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        middlewareConfig,
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        twitterConfig,
        appleConfig
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    WinstonModule.forRootAsync({
      inject: [DebuggerOptionService],
      imports: [DebuggerModule],
      useFactory: (loggerService: DebuggerOptionService) =>
        loggerService.createLogger(),
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    HelperModule,
    MessageModule,
    DebuggerModule,
    ComponentModule,
    MailModule,
    HomeModule,
  ],
})
export class AppModule {}

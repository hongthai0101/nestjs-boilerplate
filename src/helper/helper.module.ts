import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HelperArrayService,
  HelperService,
  HelperDateService,
  HelperEncryptionService,
  HelperNumberService,
  HelperHashService,
  HelperStringService,
} from './service';

@Global()
@Module({
  providers: [
    HelperService,
    HelperArrayService,
    HelperDateService,
    HelperEncryptionService,
    HelperHashService,
    HelperNumberService,
    HelperStringService,
  ],
  exports: [
    HelperService,
    HelperArrayService,
    HelperDateService,
    HelperEncryptionService,
    HelperHashService,
    HelperNumberService,
    HelperStringService,
  ],
  controllers: [],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('helper.jwt.defaultSecretKey'),
          signOptions: {
            expiresIn: configService.get<string>(
              'helper.jwt.defaultExpirationTime',
            ),
          },
        };
      },
    }),
  ],
})
export class HelperModule {}

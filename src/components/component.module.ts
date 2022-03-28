import { Module } from '@nestjs/common';
import { AuthAppleModule } from './auth-apple/auth-apple.module';
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthTwitterModule } from './auth-twitter/auth-twitter.module';
import { AuthModule } from './auth/auth.module';
import { CapitalModule } from './capital/capital.module';
import { CompanyModule } from './company/company.module';
import { FilesModule } from './files/files.module';
import { ForgotModule } from './forgot/forgot.module';
import { TomatoModule } from './tomato/tomato.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    UsersModule,
    FilesModule,
    AuthModule,
    AuthAppleModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthTwitterModule,
    ForgotModule,
    CapitalModule,
    CompanyModule,
    TomatoModule
  ],
})
export class ComponentModule {}

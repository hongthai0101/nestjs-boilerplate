import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  expireRememberMe: +process.env.AUTH_JWT_TOKEN_EXPIRES_REMEMBER_ME || 7776000000
}));

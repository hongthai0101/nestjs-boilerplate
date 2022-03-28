import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { createHash } from 'crypto';

@Injectable()
export class HelperHashService {
  constructor(private readonly configService: ConfigService) {}

  async randomSalt(length?: number): Promise<string> {
    return bcrypt.genSalt(
      length || this.configService.get<number>('helper.salt.length'),
    );
  }

  async bcrypt(passwordString: string, salt: string): Promise<string> {
    return bcrypt.hash(passwordString, salt);
  }

  async bcryptCompare(
    passwordString: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return bcrypt.compare(passwordString, passwordHashed);
  }

  async sha256(string: string): Promise<string> {
    return createHash('sha256').update(string).digest('hex');
  }

  async sha256Compare(string: string, hash: string): Promise<boolean> {
    const stringHash: string = createHash('sha256')
      .update(string)
      .digest('hex');
    return stringHash === hash;
  }
}

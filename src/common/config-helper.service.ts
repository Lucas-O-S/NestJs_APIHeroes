import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigHelperService {
  constructor(
    private configService: ConfigService,
  ) {}

  async getHash() {
    return {
        encryption_key: this.configService.get<string>('ENCRYPTION_KEY'),
        salt_rounds: this.configService.get<number>('SALT_ROUNDS')
    }
  }

}

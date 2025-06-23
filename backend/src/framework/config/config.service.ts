import { AppConfig } from '@/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypedConfigService {
  constructor(private readonly configService: ConfigService<AppConfig, true>) {}

  get<T extends keyof AppConfig>(key: T): AppConfig[T] {
    return this.configService.get(key, { infer: true });
  }
}

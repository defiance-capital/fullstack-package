import config from '@/config';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypedConfigService } from './config.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [config], cache: true })],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class TypedConfigModule {}

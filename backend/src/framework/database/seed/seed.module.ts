import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypedConfigModule } from '@/framework/config/config.module';
import { TypedConfigService } from '@/framework/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypedConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: TypedConfigService) => config.get('database'),
      inject: [TypedConfigService],
    }),
  ],
  providers: [SeedService],
})
export class SeedModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: TypedConfigService) => config.get('database'),
      inject: [TypedConfigService],
    }),
  ],
})
export class DatabaseModule {}

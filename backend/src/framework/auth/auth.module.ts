import { IAuthService } from '@/application/port/auth.service.interface';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypedConfigService } from '../config/config.service';
import { AuthService } from './auth.service.';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: TypedConfigService) => config.get('auth'),
      inject: [TypedConfigService],
    }),
  ],
  providers: [{ provide: IAuthService, useClass: AuthService }],
  exports: [IAuthService],
})
export class AuthModule {}

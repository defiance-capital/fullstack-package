import { IAuthService } from '@/application/port/auth.service.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypedConfigService } from '../config/config.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: TypedConfigService
  ) {}

  async sign(
    payload: object,
    options?: Record<string, unknown>
  ): Promise<{ accessToken: string; expiresIn: number }> {
    return {
      accessToken: await this.jwtService.signAsync(payload, options),
      expiresIn: this.configService.get('auth').signOptions.expiresIn,
    };
  }

  async verify<T extends object>(token: string, options?: Record<string, unknown>): Promise<T> {
    return this.jwtService.verifyAsync<T>(token, options);
  }
}

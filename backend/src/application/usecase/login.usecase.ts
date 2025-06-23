import { IUserRepository } from '@/domain/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { LoginCommand, LoginResult } from '../dto/login.command';
import { ErrorCode, UseCaseException } from '../exception/usecase.exception';
import { IAuthService } from '../port/auth.service.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly authService: IAuthService
  ) {}

  async execute(loginDto: LoginCommand): Promise<LoginResult> {
    const user = await this.userRepo.findByUsername(loginDto.username);

    if (!user) {
      throw new UseCaseException(ErrorCode.INVALID_CREDENTIALS, 'Invalid username or password');
    }

    const sign = await this.authService.sign({
      sub: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      jti: randomUUID(),
    });

    return {
      accessToken: sign.accessToken,
      expiresIn: sign.expiresIn,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    };
  }
}

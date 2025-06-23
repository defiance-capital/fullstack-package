import { IAuthService } from '@/application/port/auth.service.interface';
import { AuthenticatedUser } from '@/application/port/auth.user.interface';
import { TokenExpiredException } from '@/framework/exception/token-exired.exception';
import { TokenInvalidException } from '@/framework/exception/token-invalid.exception';
import { CanActivate, createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: IAuthService) {}

  private excludedPaths = ['^/api/v\\d+/login$'];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const shouldSkip = this.excludedPaths.some((path) => new RegExp(path).test(request.path));
    if (shouldSkip) {
      return true;
    }

    const token = request.cookies?.access_token as string;

    if (!token) {
      throw new TokenInvalidException();
    }

    try {
      const payload = await this.authService.verify<{ sub: number }>(token);
      request['user'] = { ...payload, id: payload.sub };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new TokenExpiredException();
      }
      throw new TokenInvalidException();
    }

    return true;
  }
}

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthenticatedUser }>();
    return request.user;
  }
);

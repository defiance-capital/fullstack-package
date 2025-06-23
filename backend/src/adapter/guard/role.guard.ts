import { AuthenticatedUser } from '@/application/port/auth.user.interface';
import { UserRole } from '@/domain/entity/user.entity';
import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const ROLE_KEY = 'role';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<{ user: AuthenticatedUser }>();
    const user = request.user;

    return user.role === requiredRole;
  }
}

export function Role(role: UserRole) {
  return applyDecorators(SetMetadata(ROLE_KEY, role), UseGuards(RoleGuard));
}

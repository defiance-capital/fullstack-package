import { UnauthorizedException } from '@nestjs/common';

export class TokenExpiredException extends UnauthorizedException {
  constructor(message = 'Token has expired') {
    super(message);
  }
}

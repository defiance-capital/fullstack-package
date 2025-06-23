import { UnauthorizedException } from '@nestjs/common';

export class TokenInvalidException extends UnauthorizedException {
  constructor(message = 'Token is invalid') {
    super(message);
  }
}

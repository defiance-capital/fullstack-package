import { BusinessException } from '@/domain/exception/business.exception';

export enum ErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  RESOUCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT = 'RESOURCE_CONFLICT',
  INVALID_DATA = 'INVALID_DATA',
}

export class UseCaseException extends BusinessException {
  constructor(
    public readonly code: ErrorCode,
    public readonly message: string = 'An error occurred in the use case.'
  ) {
    super(code, message);
  }
}

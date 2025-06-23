import { ErrorCode, UseCaseException } from './usecase.exception';

export class ResourceConflictException extends UseCaseException {
  constructor(message: string) {
    super(ErrorCode.RESOURCE_CONFLICT, message);
  }
}

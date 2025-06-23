import { ErrorCode, UseCaseException } from './usecase.exception';

export class ResourceNotFoundException extends UseCaseException {
  constructor(
    public readonly resource: string,
    message: string = `Resource ${resource} not found.`
  ) {
    super(ErrorCode.RESOUCE_NOT_FOUND, message);
  }
}

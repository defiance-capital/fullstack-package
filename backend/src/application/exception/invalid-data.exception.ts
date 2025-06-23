import { ErrorCode, UseCaseException } from './usecase.exception';

export class InvalidDataException extends UseCaseException {
  constructor(message: string) {
    super(ErrorCode.INVALID_DATA, message);
  }
}

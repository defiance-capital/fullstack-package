import { ErrorCode } from './errorCode';

export const ErrorMessage: Record<ErrorCode, string> = {
  [ErrorCode.TOKEN_INVALID]: 'Invalid session.',
  [ErrorCode.TOKEN_EXPIRED]: 'Session has expired.',
  [ErrorCode.FORBIDDEN]: 'You do not have permission to perform this action.',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error.',
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid username or password',
};

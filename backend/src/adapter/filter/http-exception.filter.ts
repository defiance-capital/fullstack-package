import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(exception.getStatus()).json({
      success: false,
      errorCode: getErrorCode(exception),
      message: exception.message,
      errors: (exception.getResponse() as { errors?: unknown })?.errors ?? undefined,
    });
  }
}

function getErrorCode(exception: HttpException) {
  return exception.constructor.name
    .replace(/Exception$/, '')
    .replace(/(.)([A-Z][a-z]+)/g, '$1_$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toUpperCase();
}

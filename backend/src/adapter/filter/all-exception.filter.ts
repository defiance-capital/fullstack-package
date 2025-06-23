import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let message = 'An unexpected error occurred';
    let stack: string | undefined;

    const isDebug = process.env.APP_DEBUG === 'true';

    if (isDebug) {
      if (exception instanceof Error) {
        message = exception.message;
        stack = exception.stack;
      } else if (typeof exception === 'string') {
        message = exception;
      }
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message,
      stack,
    });
  }
}

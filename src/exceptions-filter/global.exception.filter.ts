import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { IHttpError } from '../common/errors/http.error';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: IHttpError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status = exception.status ?? 500;
    const message = exception.message ?? 'Ошибка на стороне сервера';
    const details = exception.details ?? exception;

    const error = {} as IHttpError;

    error.status = status;
    error.message = message;
    error.details = details;

    response.status(status).send(error);
  }
}

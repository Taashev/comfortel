import { HttpStatus } from '@nestjs/common';
import { DetailsError, MessageError, HttpError } from './http.error';

export class NotFoundError extends HttpError {
  constructor(message: MessageError, details?: DetailsError) {
    super(HttpStatus.NOT_FOUND, message, details);
  }
}

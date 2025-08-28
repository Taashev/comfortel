import { HttpStatus } from '@nestjs/common';
import { DetailsError, MessageError, HttpError } from './http.error';

export class BadRequestError extends HttpError {
  constructor(message: MessageError, details?: DetailsError) {
    super(HttpStatus.BAD_REQUEST, message, details);
  }
}

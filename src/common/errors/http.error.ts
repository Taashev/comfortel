import { IntrinsicException } from '@nestjs/common';

export type StatusError = number;
export type MessageError = string;
export type DetailsError = unknown;

export interface IHttpError extends IntrinsicException {
  status: StatusError;
  message: MessageError;
  details?: DetailsError;
}

export class HttpError extends IntrinsicException implements IHttpError {
  status: StatusError;
  message: MessageError;
  details?: DetailsError;

  constructor(
    status: StatusError,
    message: MessageError,
    details?: DetailsError,
  ) {
    super(message);

    this.status = status;
    this.message = message;
    this.details = details;
  }
}

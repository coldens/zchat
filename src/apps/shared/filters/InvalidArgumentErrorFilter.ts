import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidArgumentError } from '../../../modules/shared/domain/ValueObjects/InvalidArgumentError';

@Catch(InvalidArgumentError)
export class InvalidArgumentErrorFilter implements ExceptionFilter {
  catch(exception: InvalidArgumentError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).send({
      statusCode: status,
      message: exception.message,
      error: 'NOT ACCEPTABLE',
    });
  }
}

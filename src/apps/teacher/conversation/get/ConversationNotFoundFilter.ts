import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ConversationNotFound } from '../../../../modules/conversation/domain/ConversationNotFound';

@Catch(ConversationNotFound)
export class ConversationNotFoundFilter implements ExceptionFilter {
  catch(exception: ConversationNotFound, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.NOT_FOUND;

    response.status(status).send({
      statusCode: status,
      message: exception.message,
      error: 'NOT FOUND',
    });
  }
}

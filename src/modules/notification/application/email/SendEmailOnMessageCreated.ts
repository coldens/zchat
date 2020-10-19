import { EventsHandler } from '@nestjs/cqrs';
import { MessageCreated } from '../../../message/domain/MessageCreated';
import { MessageId } from '../../../shared/domain/ValueObjects/MessageId';
import { SendEmailService } from './SendEmailService';

@EventsHandler(MessageCreated)
export class SendEmailOnMessageCreated {
  constructor(private service: SendEmailService) {}

  async handle(event: MessageCreated) {
    await this.service.run(new MessageId(event.messageId));
  }
}

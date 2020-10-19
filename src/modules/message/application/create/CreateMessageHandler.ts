import { CommandHandler } from '@nestjs/cqrs';
import { Addressable } from '../../../shared/domain/ValueObjects/Addressable';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { MessageId } from '../../../shared/domain/ValueObjects/MessageId';
import { MessageBody } from '../../domain/MessageBody';
import { MessageRead } from '../../domain/MessageRead';
import { MessageSubmitDate } from '../../domain/MessageSubmitDate';
import { CreateMessageCommand } from './CreateMessageCommand';
import { CreateMessageService } from './CreateMessageService';

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler {
  constructor(private service: CreateMessageService) {}

  async execute(command: CreateMessageCommand) {
    const { id, conversationId, from, body, submitDate, readed } = command;

    await this.service.run(
      new MessageId(id),
      new ConversationId(conversationId),
      Addressable.fromPrimitives(from.type, from.value),
      new MessageBody(body.type, body.value),
      new MessageSubmitDate(new Date(submitDate)),
      new MessageRead(readed),
    );
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import { FindConversationQuery } from '../../../conversation/application/find/FindConversationQuery';
import { ConversationNotFound } from '../../../conversation/domain/ConversationNotFound';
import { Addressable } from '../../../shared/domain/ValueObjects/Addressable';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { MessageId } from '../../../shared/domain/ValueObjects/MessageId';
import { Message } from '../../domain/Message';
import { MessageBody } from '../../domain/MessageBody';
import { MessageRead } from '../../domain/MessageRead';
import { MessageRepository } from '../../domain/MessageRepository';
import { MessageSubmitDate } from '../../domain/MessageSubmitDate';

@Injectable()
export class CreateMessageService {
  constructor(
    @Inject('MessageRepository')
    private messageRepository: MessageRepository,
    private eventBus: EventBus,
    private queryBus: QueryBus,
  ) {}

  async run(
    messageId: MessageId,
    conversationId: ConversationId,
    messageFrom: Addressable,
    messageBody: MessageBody,
    messageSubmitDate: MessageSubmitDate,
    messageReaded: MessageRead,
  ) {
    this.ensureConversationExists(conversationId);

    const message = Message.create(
      messageId,
      conversationId,
      messageFrom,
      messageBody,
      messageSubmitDate,
      messageReaded,
    );

    const events = message.pullEvents();
    await this.messageRepository.create(message);

    this.eventBus.publishAll(events);
  }

  private async ensureConversationExists(conversationId: ConversationId) {
    const conversation = await this.queryBus.execute(
      new FindConversationQuery(conversationId.value),
    );

    if (conversation === null) {
      throw new ConversationNotFound(conversationId);
    }
  }
}

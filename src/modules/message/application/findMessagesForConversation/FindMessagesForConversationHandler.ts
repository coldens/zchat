import { QueryHandler } from '@nestjs/cqrs';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { FindMessagesForConversationQuery } from './FindMessagesForConversationQuery';
import { FindMessagesForConversationService } from './FindMessagesForConversationService';

@QueryHandler(FindMessagesForConversationQuery)
export class FindMessagesForConversationHandler {
  constructor(private service: FindMessagesForConversationService) {}

  async execute(query: FindMessagesForConversationQuery) {
    const messages = await this.service.run(
      new ConversationId(query.conversationId),
    );

    return messages.map((m) => m.toPrimitives());
  }
}

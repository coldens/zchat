import { QueryHandler } from '@nestjs/cqrs';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { FindUnreadConversationCountersForConversationsQuery } from './FindUnreadConversationCountersForConversationsQuery';
import { FindUnreadConversationCountersForConversationsService } from './FindUnreadConversationCountersForConversationsService';

@QueryHandler(FindUnreadConversationCountersForConversationsQuery)
export class FindUnreadConversationCountersForConversationsHandler {
  constructor(
    private service: FindUnreadConversationCountersForConversationsService,
  ) {}

  async execute(query: FindUnreadConversationCountersForConversationsQuery) {
    const counters = await this.service.run(
      query.conversationsId.map((id) => new ConversationId(id)),
    );

    return counters.map((c) => c.toPrimitives());
  }
}

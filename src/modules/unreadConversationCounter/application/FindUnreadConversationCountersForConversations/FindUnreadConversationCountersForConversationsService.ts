import { Inject, Injectable } from '@nestjs/common';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { UnreadConversationCounterRepository } from '../../domain/UnreadConversationCounterRepository';

@Injectable()
export class FindUnreadConversationCountersForConversationsService {
  constructor(
    @Inject('UnreadConversationCounterRepository')
    private repository: UnreadConversationCounterRepository,
  ) {}

  async run(conversationId: ConversationId[]) {
    const counters = await this.repository.findByCriteria({ conversationId });
    return counters;
  }
}

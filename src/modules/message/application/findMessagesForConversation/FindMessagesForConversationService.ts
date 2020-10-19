import { Inject, Injectable } from '@nestjs/common';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { MessageCriteria } from '../../domain/MessageCriteria';
import { MessageRepository } from '../../domain/MessageRepository';

@Injectable()
export class FindMessagesForConversationService {
  constructor(
    @Inject('MessageRepository')
    private messageRepository: MessageRepository,
  ) {}

  async run(conversationId: ConversationId) {
    const messages = await this.messageRepository.findByCriteria(
      new MessageCriteria({ conversationId }, { by: 'submitDate', dir: 'asc' }),
    );

    return messages;
  }
}

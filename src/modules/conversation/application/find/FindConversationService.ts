import { Inject, Injectable } from '@nestjs/common';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { ConversationNotFound } from '../../domain/ConversationNotFound';
import { ConversationRepository } from '../../domain/ConversationRepository';

@Injectable()
export class FindConversationService {
  constructor(
    @Inject('ConversationRepository')
    private conversationRepository: ConversationRepository,
  ) {}

  async run(conversationId: ConversationId) {
    const conversation = await this.conversationRepository.findOne(
      conversationId,
    );

    if (conversation === null) {
      throw new ConversationNotFound(conversationId);
    }

    return conversation;
  }
}

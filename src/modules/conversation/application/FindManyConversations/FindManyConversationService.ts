import { Inject, Injectable } from '@nestjs/common';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { ConversationRepository } from '../../domain/ConversationRepository';

@Injectable()
export class FindManyConversationService {
  constructor(
    @Inject('ConversationRepository')
    private conversationRepository: ConversationRepository,
  ) {}

  async run(id: ConversationId[]) {
    const conversation = await this.conversationRepository.findByCriteria({
      id,
    });

    return conversation;
  }
}

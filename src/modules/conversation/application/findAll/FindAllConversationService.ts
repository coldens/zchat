import { Inject, Injectable } from '@nestjs/common';
import { ConversationRepository } from '../../domain/ConversationRepository';

@Injectable()
export class FindAllConversationService {
  constructor(
    @Inject('ConversationRepository')
    private conversationRepository: ConversationRepository,
  ) {}

  async run() {
    const conversation = await this.conversationRepository.findAll();
    return conversation;
  }
}

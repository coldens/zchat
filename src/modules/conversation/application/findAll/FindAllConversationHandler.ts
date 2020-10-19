import { QueryHandler } from '@nestjs/cqrs';
import { FindAllConversationQuery } from './FindAllConversationQuery';
import { FindAllConversationService } from './FindAllConversationService';

@QueryHandler(FindAllConversationQuery)
export class FindAllConversationHandler {
  constructor(readonly service: FindAllConversationService) {}

  async execute(query: FindAllConversationQuery) {
    const conversations = await this.service.run();
    return conversations.map((c) => c.toPrimitives());
  }
}

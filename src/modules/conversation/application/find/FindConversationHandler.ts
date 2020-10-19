import { QueryHandler } from '@nestjs/cqrs';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { FindConversationQuery } from './FindConversationQuery';
import { FindConversationService } from './FindConversationService';

@QueryHandler(FindConversationQuery)
export class FindConversationHandler {
  constructor(readonly service: FindConversationService) {}

  async execute(query: FindConversationQuery) {
    const result = await this.service.run(
      new ConversationId(query.conversationId),
    );

    return result.toPrimitives();
  }
}

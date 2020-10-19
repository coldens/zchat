import { QueryHandler } from '@nestjs/cqrs';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { FindManyConversationQuery } from './FindManyConversationQuery';
import { FindManyConversationService } from './FindManyConversationService';

@QueryHandler(FindManyConversationQuery)
export class FindManyConversationHandler {
  constructor(readonly service: FindManyConversationService) {}

  async execute(query: FindManyConversationQuery) {
    const result = await this.service.run(
      query.ids.map((id) => new ConversationId(id)),
    );

    return result.map((c) => c.toPrimitives());
  }
}

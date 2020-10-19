import { EventsHandler, QueryBus } from '@nestjs/cqrs';
import { FindMessageQuery } from '../../../message/application/find/FindMessageQuery';
import { MessageCreated } from '../../../message/domain/MessageCreated';
import { MessageReaded } from '../../../message/domain/MessageReaded';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { RecalculateCounterService } from './RecalculateCounterService';

@EventsHandler(MessageCreated, MessageReaded)
export class RecalculateCounterOnMessagesChanged {
  constructor(
    private service: RecalculateCounterService,
    private queryBus: QueryBus,
  ) {}

  async handle(event: MessageCreated | MessageReaded) {
    const message = await this.queryBus.execute(
      new FindMessageQuery(event.messageId),
    );

    await this.service.run(new ConversationId(message.conversationId));
  }
}

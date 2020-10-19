import { Inject, Injectable } from '@nestjs/common';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import { FindConversationQuery } from '../../../conversation/application/find/FindConversationQuery';
import { FindMessagesForConversationQuery } from '../../../message/application/findMessagesForConversation/FindMessagesForConversationQuery';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { UnreadConversationCounterFactory } from '../../domain/UnreadConversationCounterFactory';
import { UnreadConversationCounterRepository } from '../../domain/UnreadConversationCounterRepository';

@Injectable()
export class RecalculateCounterService {
  constructor(
    @Inject('UnreadConversationCounterRepository')
    private repository: UnreadConversationCounterRepository,
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}

  async run(conversationId: ConversationId) {
    const conversation = await this.queryBus.execute(
      new FindConversationQuery(conversationId.value),
    );
    const allMessages: any[] = await this.queryBus.execute(
      new FindMessagesForConversationQuery(conversation.id),
    );

    const unreadForStudent = allMessages.filter(
      (m) => m.from.type === 'teacher' && !m.readed,
    ).length;
    const unreadForCourse = allMessages.filter(
      (m) => m.from.type === 'student' && !m.readed,
    ).length;

    const factory = new UnreadConversationCounterFactory(this.repository);
    const counter = await factory.run(
      conversation,
      unreadForStudent,
      unreadForCourse,
    );

    const events = counter.pullEvents();
    await this.repository.save(counter);
    this.eventBus.publishAll(events);
  }
}

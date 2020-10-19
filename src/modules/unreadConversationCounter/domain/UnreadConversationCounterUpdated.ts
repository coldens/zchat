import { DomainEvent } from '../../shared/domain/DomainEvent';

export class UnreadConversationCounterUpdated extends DomainEvent {
  readonly eventName: string =
    'pe.lacafetalab.zchat.unread.conversation.counter.updated';

  constructor(
    readonly unreadConversationCounterId: string,
    readonly conversationId: string,
    readonly totalStudent: number,
    readonly totalCourse: number,
    id?: string,
  ) {
    super(id);
  }
}

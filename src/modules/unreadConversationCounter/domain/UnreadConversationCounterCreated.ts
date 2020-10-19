import { DomainEvent } from '../../shared/domain/DomainEvent';

export class UnreadConversationCounterCreated extends DomainEvent {
  readonly eventName =
    'pe.lacafetalab.zchat.unread_conversation_counter.created';

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

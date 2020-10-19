import { DomainEvent } from '../../shared/domain/DomainEvent';

export class ConversationCreated extends DomainEvent {
  readonly eventName = 'pe.lacafetalab.zchat.conversation.created';

  constructor(readonly conversationId: string, id?: string) {
    super(id);
  }
}

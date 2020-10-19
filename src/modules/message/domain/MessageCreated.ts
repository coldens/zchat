import { DomainEvent } from '../../shared/domain/DomainEvent';

export class MessageCreated extends DomainEvent {
  readonly eventName: string = 'pe.lacafetalab.zchat.message.created';

  constructor(readonly messageId: string, id?: string) {
    super(id);
  }
}

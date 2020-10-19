import { DomainEvent } from '../../shared/domain/DomainEvent';

export class MessageReaded extends DomainEvent {
  readonly eventName: string = 'pe.lacafetalab.zchat.message.readed';

  constructor(readonly messageId: string, id?: string) {
    super(id);
  }
}

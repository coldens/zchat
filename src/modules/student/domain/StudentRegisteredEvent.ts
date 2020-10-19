import { DomainEvent } from '../../shared/domain/DomainEvent';

export class StudentRegisteredEvent extends DomainEvent {
  readonly eventName = 'pe.lacafetalab.zchat.student.registered';

  constructor(readonly studentId: string, id?: string) {
    super(id);
  }
}

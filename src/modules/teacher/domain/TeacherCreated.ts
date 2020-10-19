import { DomainEvent } from '../../shared/domain/DomainEvent';

export class TeacherCreated extends DomainEvent {
  readonly eventName: string = 'pe.lacafetalab.zchat.teacher.created';

  constructor(readonly teacherId: string, id?: string) {
    super(id);
  }
}

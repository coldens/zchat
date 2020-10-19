import { DomainEvent } from '../../shared/domain/DomainEvent';

export class CourseCreated extends DomainEvent {
  readonly eventName = 'pe.lacafetalab.zchat.course.created';

  constructor(readonly courseId: string, id?: string) {
    super(id);
  }
}

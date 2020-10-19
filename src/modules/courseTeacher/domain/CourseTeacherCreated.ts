import { DomainEvent } from '../../shared/domain/DomainEvent';

export class CourseTeacherCreated extends DomainEvent {
  readonly eventName = 'pe.lacafetalab.zchat.course_teacher.created';

  constructor(readonly courseTeacherId: string, id?: string) {
    super(id);
  }
}

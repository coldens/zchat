import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { CourseTeacherId } from '../../shared/domain/ValueObjects/CourseTeacherId';
import { TeacherId } from '../../shared/domain/ValueObjects/TeacherId';
import { CourseTeacherCreated } from './CourseTeacherCreated';

export class CourseTeacher extends AggregateRoot {
  constructor(
    readonly id: CourseTeacherId,
    readonly teacherId: TeacherId,
    readonly courseId: CourseId,
  ) {
    super();
  }

  static create(id: CourseTeacherId, teacherId: TeacherId, courseId: CourseId) {
    const courseTeacher = new CourseTeacher(id, teacherId, courseId);
    courseTeacher.pushEvent(new CourseTeacherCreated(id.value));
    return courseTeacher;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      teacherId: this.teacherId.value,
      courseId: this.courseId.value,
    };
  }

  static fromPrimitives(id: string, teacherId: string, courseId: string) {
    return new CourseTeacher(
      new CourseTeacherId(id),
      new TeacherId(teacherId),
      new CourseId(courseId),
    );
  }
}

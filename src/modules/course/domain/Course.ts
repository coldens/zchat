import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { CourseAvatar } from './CourseAvatar';
import { CourseCreated } from './CourseCreated';
import { CourseName } from './CourseName';

export class Course extends AggregateRoot {
  constructor(
    readonly id: CourseId,
    readonly name: CourseName,
    readonly avatar: CourseAvatar,
  ) {
    super();
  }

  static create(id: CourseId, name: CourseName, avatar: CourseAvatar) {
    const course = new this(id, name, avatar);
    course.pushEvent(new CourseCreated(id.value));

    return course;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      avatar: this.avatar.value,
    };
  }

  static fromPrimitives(id: string, name: string, avatar: string) {
    return new Course(
      new CourseId(id),
      new CourseName(name),
      new CourseAvatar(avatar),
    );
  }
}

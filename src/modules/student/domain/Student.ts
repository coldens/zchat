import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { StudentId } from '../../shared/domain/ValueObjects/StudentId';
import { StudentAvatar } from './StudentAvatar';
import { StudentEmail } from './StudentEmail';
import { StudentName } from './StudentName';
import { StudentRegisteredEvent } from './StudentRegisteredEvent';

export class Student extends AggregateRoot {
  constructor(
    readonly id: StudentId,
    readonly name: StudentName,
    readonly email: StudentEmail,
    readonly avatar: StudentAvatar,
  ) {
    super();
  }

  static register(
    id: StudentId,
    name: StudentName,
    email: StudentEmail,
    avatar: StudentAvatar,
  ) {
    const student = new Student(id, name, email, avatar);
    student.pushEvent(new StudentRegisteredEvent(id.value));
    return student;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      avatar: this.avatar.value,
    };
  }

  static fromPrimitives(
    id: string,
    name: string,
    email: string,
    avatar: string,
  ) {
    return new Student(
      new StudentId(id),
      new StudentName(name),
      new StudentEmail(email),
      new StudentAvatar(avatar),
    );
  }
}

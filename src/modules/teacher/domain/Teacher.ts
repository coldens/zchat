import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { TeacherId } from '../../shared/domain/ValueObjects/TeacherId';
import { TeacherAvatar } from './TeacherAvatar';
import { TeacherCreated } from './TeacherCreated';
import { TeacherEmail } from './TeacherEmail';
import { TeacherLastName } from './TeacherLastName';
import { TeacherName } from './TeacherName';
import { TeacherPassword } from './TeacherPassword';

export class Teacher extends AggregateRoot {
  constructor(
    readonly id: TeacherId,
    readonly name: TeacherName,
    readonly lastname: TeacherLastName,
    readonly email: TeacherEmail,
    readonly password: TeacherPassword,
    readonly avatar: TeacherAvatar,
  ) {
    super();
  }

  static create(
    id: TeacherId,
    name: TeacherName,
    lastname: TeacherLastName,
    email: TeacherEmail,
    password: TeacherPassword,
    avatar: TeacherAvatar,
  ) {
    const teacher = new this(id, name, lastname, email, password, avatar);
    teacher.pushEvent(new TeacherCreated(id.value));

    return teacher;
  }

  static fromPrimitives(
    id: string,
    name: string,
    lastname: string,
    email: string,
    password: string,
    avatar: string,
  ) {
    return new this(
      new TeacherId(id),
      new TeacherName(name),
      new TeacherLastName(lastname),
      new TeacherEmail(email),
      new TeacherPassword(password),
      new TeacherAvatar(avatar),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
      avatar: this.avatar.value,
    };
  }
}

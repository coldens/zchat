import { StudentId } from './StudentId';
import { TeacherId } from './TeacherId';

export type ValidType = 'student' | 'teacher';

export class Addressable {
  constructor(
    readonly type: ValidType,
    readonly value: StudentId | TeacherId,
  ) {}

  static fromPrimitives(type: string, value: string) {
    let id: StudentId | TeacherId;

    if (type === 'teacher') {
      id = new TeacherId(value);
    }
    if (type === 'student') {
      id = new StudentId(value);
    }

    return new this(<ValidType>type, id);
  }

  toPrimitives() {
    return {
      type: <string>this.type,
      value: <string>this.value.value,
    };
  }
}

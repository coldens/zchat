import * as faker from 'faker';
import { Course } from '../../../../src/modules/course/domain/Course';
import { CourseAvatar } from '../../../../src/modules/course/domain/CourseAvatar';
import { CourseName } from '../../../../src/modules/course/domain/CourseName';
import { CourseId } from '../../../../src/modules/shared/domain/ValueObjects/CourseId';

export class CourseMother {
  static random() {
    return new Course(
      CourseId.random(),
      new CourseName(faker.random.words(2)),
      new CourseAvatar(faker.random.image()),
    );
  }

  static getMany() {
    const randomArray = Array.from(Array(faker.random.number(10)));
    return randomArray.map(() => CourseMother.random());
  }
}

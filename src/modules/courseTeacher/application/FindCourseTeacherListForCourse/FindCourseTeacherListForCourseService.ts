import { Inject, Injectable } from '@nestjs/common';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { CourseTeacherRepository } from '../../domain/CourseTeacherRepository';

@Injectable()
export class FindCourseTeacherListForCourseService {
  constructor(
    @Inject('CourseTeacherRepository')
    private repository: CourseTeacherRepository,
  ) {}

  async run(courseId: CourseId) {
    const courseTeacherList = await this.repository.findByCriteria({
      courseId,
    });

    return courseTeacherList;
  }
}

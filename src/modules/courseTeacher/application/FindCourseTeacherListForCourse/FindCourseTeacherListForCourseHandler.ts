import { QueryHandler } from '@nestjs/cqrs';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { FindCourseTeacherListForCourseQuery } from './FindCourseTeacherListForCourseQuery';
import { FindCourseTeacherListForCourseService } from './FindCourseTeacherListForCourseService';

@QueryHandler(FindCourseTeacherListForCourseQuery)
export class FindCourseTeacherListForCourseHandler {
  constructor(private service: FindCourseTeacherListForCourseService) {}

  async execute(query: FindCourseTeacherListForCourseQuery) {
    const courseTeacherList = await this.service.run(
      new TeacherId(query.courseId),
    );

    return courseTeacherList.map((courseTeacher) =>
      courseTeacher.toPrimitives(),
    );
  }
}

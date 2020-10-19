import { QueryHandler } from '@nestjs/cqrs';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { FindCourseTeacherListForTeacherQuery } from './FindCourseTeacherListForTeacherQuery';
import { FindCourseTeacherListForTeacherService } from './FindCourseTeacherListForTeacherService';

@QueryHandler(FindCourseTeacherListForTeacherQuery)
export class FindCourseTeacherListForTeacherHandler {
  constructor(private service: FindCourseTeacherListForTeacherService) {}

  async execute(query: FindCourseTeacherListForTeacherQuery) {
    const courseTeacherList = await this.service.run(
      new TeacherId(query.teacherId),
    );

    return courseTeacherList.map((courseTeacher) =>
      courseTeacher.toPrimitives(),
    );
  }
}

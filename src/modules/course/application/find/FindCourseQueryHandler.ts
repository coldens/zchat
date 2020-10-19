import { QueryHandler } from '@nestjs/cqrs';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { FindCourseQuery } from './FindCourseQuery';
import { FindCourseService } from './FindCourseService';

@QueryHandler(FindCourseQuery)
export class FindCourseQueryHandler {
  constructor(private service: FindCourseService) {}

  async execute(query: FindCourseQuery) {
    const course = await this.service.run(new CourseId(query.id));
    return course.toPrimitives();
  }
}

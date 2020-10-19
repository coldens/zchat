import { QueryHandler } from '@nestjs/cqrs';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { FindManyCoursesQuery } from './FindManyCoursesQuery';
import { FindManyCoursesService } from './FindManyCoursesService';

@QueryHandler(FindManyCoursesQuery)
export class FindManyCoursesHandler {
  constructor(private service: FindManyCoursesService) {}

  async execute(query: FindManyCoursesQuery) {
    const courses = await this.service.run(
      query.ids.map((id) => new CourseId(id)),
    );
    return courses.map((c) => c.toPrimitives());
  }
}

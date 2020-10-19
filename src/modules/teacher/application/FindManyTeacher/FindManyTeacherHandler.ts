import { QueryHandler } from '@nestjs/cqrs';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { FindManyTeacherQuery } from './FindManyTeacherQuery';
import { FindManyTeacherService } from './FindManyTeacherService';

@QueryHandler(FindManyTeacherQuery)
export class FindManyTeacherHandler {
  constructor(private service: FindManyTeacherService) {}

  async execute(query: FindManyTeacherQuery) {
    const teachers = await this.service.run(
      query.ids.map((id) => new TeacherId(id)),
    );

    return teachers.map((teacher) => teacher.toPrimitives());
  }
}

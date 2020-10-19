import { QueryHandler } from '@nestjs/cqrs';
import { StudentId } from '../../../shared/domain/ValueObjects/StudentId';
import { FindManyStudentQuery } from './FindManyStudentQuery';
import { FindManyStudentService } from './FindManyStudentService';

@QueryHandler(FindManyStudentQuery)
export class FindManyStudentHandler {
  constructor(private service: FindManyStudentService) {}

  async execute(query: FindManyStudentQuery) {
    const students = await this.service.run(
      query.ids.map((id) => new StudentId(id)),
    );

    return students.map((s) => s.toPrimitives());
  }
}

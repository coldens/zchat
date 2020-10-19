import { QueryHandler } from '@nestjs/cqrs';
import { StudentId } from '../../../shared/domain/ValueObjects/StudentId';
import { FindStudentQuery } from './FindStudentQuery';
import { FindStudentService } from './FindStudentService';

@QueryHandler(FindStudentQuery)
export class FindStudentHandler {
  constructor(private service: FindStudentService) {}

  async execute(query: FindStudentQuery) {
    const student = await this.service.run(new StudentId(query.id));
    return student.toPrimitives();
  }
}

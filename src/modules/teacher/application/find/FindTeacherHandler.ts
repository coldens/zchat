import { QueryHandler } from '@nestjs/cqrs';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { FindTeacherQuery } from './FindTeacherQuery';
import { FindTeacherService } from './FindTeacherService';

@QueryHandler(FindTeacherQuery)
export class FindTeacherHandler {
  constructor(private service: FindTeacherService) {}

  async execute(query: FindTeacherQuery) {
    const teacher = await this.service.run(new TeacherId(query.id));
    return teacher.toPrimitives();
  }
}

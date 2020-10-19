import { QueryHandler } from '@nestjs/cqrs';
import { TeacherEmail } from '../../domain/TeacherEmail';
import { FindTeacherByEmailQuery } from './FindTeacherByEmailQuery';
import { FindTeacherByEmailService } from './FindTeacherByEmailService';

@QueryHandler(FindTeacherByEmailQuery)
export class FindTeacherByEmailHandler {
  constructor(private service: FindTeacherByEmailService) {}

  async execute(query: FindTeacherByEmailQuery) {
    const result = await this.service.run(new TeacherEmail(query.email));
    return result.toPrimitives();
  }
}

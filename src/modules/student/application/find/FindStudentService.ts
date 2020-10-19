import { Inject, Injectable } from '@nestjs/common';
import { StudentId } from '../../../shared/domain/ValueObjects/StudentId';
import { StudentNotFound } from '../../domain/StudentNotFound';
import { StudentRepository } from '../../domain/StudentRepository';

@Injectable()
export class FindStudentService {
  constructor(
    @Inject('StudentRepository')
    private repository: StudentRepository,
  ) {}

  async run(id: StudentId) {
    const student = await this.repository.findOne(id);

    if (student) {
      return student;
    }

    throw new StudentNotFound(id);
  }
}

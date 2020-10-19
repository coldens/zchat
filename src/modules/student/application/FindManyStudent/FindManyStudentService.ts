import { Inject, Injectable } from '@nestjs/common';
import { StudentId } from '../../../shared/domain/ValueObjects/StudentId';
import { StudentRepository } from '../../domain/StudentRepository';

@Injectable()
export class FindManyStudentService {
  constructor(
    @Inject('StudentRepository')
    private repository: StudentRepository,
  ) {}

  async run(id: StudentId[]) {
    const students = await this.repository.findMany(id);
    return students;
  }
}

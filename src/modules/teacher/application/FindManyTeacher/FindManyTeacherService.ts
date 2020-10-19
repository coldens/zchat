import { Inject, Injectable } from '@nestjs/common';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { TeacherRepository } from '../../domain/TeacherRepository';

@Injectable()
export class FindManyTeacherService {
  constructor(
    @Inject('TeacherRepository')
    private repository: TeacherRepository,
  ) {}

  async run(id: TeacherId[]) {
    const teachers = await this.repository.findByCriteria({ id });
    return teachers;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { TeacherNotFound } from '../../domain/TeacherNotFound';
import { TeacherRepository } from '../../domain/TeacherRepository';

@Injectable()
export class FindTeacherService {
  constructor(
    @Inject('TeacherRepository')
    private repository: TeacherRepository,
  ) {}

  async run(id: TeacherId) {
    const teacher = await this.repository.findOne(id);

    if (teacher) {
      return teacher;
    }

    throw new TeacherNotFound(id);
  }
}

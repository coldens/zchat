import { Inject, Injectable } from '@nestjs/common';
import { TeacherEmail } from '../../domain/TeacherEmail';
import { TeacherRepository } from '../../domain/TeacherRepository';
import { TeacherWithEmailNotFound } from '../../domain/TeacherWithEmailNotFound';
import { ImportTeacherService } from '../import/ImportTeacherService';

@Injectable()
export class FindTeacherByEmailService {
  constructor(
    @Inject('TeacherRepository')
    private repository: TeacherRepository,
    private importService: ImportTeacherService,
  ) {}

  async run(email: TeacherEmail) {
    let teacher = await this.repository.findByEmail(email);

    if (teacher === null) {
      teacher = await this.importService.run(email);
    }

    this.ensureTeacherWithEmailExists(teacher, email);
    return teacher;
  }

  private ensureTeacherWithEmailExists(teacher: any, email: TeacherEmail) {
    if (teacher === null) {
      throw new TeacherWithEmailNotFound(email);
    }
  }
}

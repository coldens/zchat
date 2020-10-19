import { Injectable } from '@nestjs/common';
import { TeacherEmail } from '../../domain/TeacherEmail';
import { TeacherWithEmailNotFound } from '../../domain/TeacherWithEmailNotFound';
import { HttpTeacherProvider } from '../../infraestructure/HttpTeacherProvider';
import { CreateTeacherService } from '../create/CreateTeacherService';

@Injectable()
export class ImportTeacherService {
  constructor(
    private httpRepository: HttpTeacherProvider,
    private createService: CreateTeacherService,
  ) {}

  async run(email: TeacherEmail) {
    const teacher = await this.httpRepository.findByEmail(email);
    this.ensureTeacherWithEmailExists(teacher, email);

    await this.createService.run(
      teacher.id,
      teacher.name,
      teacher.lastname,
      teacher.email,
      teacher.password,
      teacher.avatar,
    );

    return teacher;
  }

  private ensureTeacherWithEmailExists(teacher: any, email: TeacherEmail) {
    if (teacher === null) {
      throw new TeacherWithEmailNotFound(email);
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { StudentId } from '../../../shared/domain/ValueObjects/StudentId';
import { Student } from '../../domain/Student';
import { StudentAvatar } from '../../domain/StudentAvatar';
import { StudentEmail } from '../../domain/StudentEmail';
import { StudentName } from '../../domain/StudentName';
import { StudentRepository } from '../../domain/StudentRepository';

@Injectable()
export class RegisterStudentService {
  constructor(
    @Inject('StudentRepository')
    private repository: StudentRepository,
    private eventBus: EventBus,
  ) {}

  async run(
    id: StudentId,
    name: StudentName,
    email: StudentEmail,
    avatar: StudentAvatar,
  ) {
    const student = Student.register(id, name, email, avatar);
    const events = student.pullEvents();

    await this.repository.save(student);

    this.eventBus.publishAll(events);
  }
}

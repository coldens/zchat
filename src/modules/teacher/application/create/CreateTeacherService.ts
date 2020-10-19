import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { Teacher } from '../../domain/Teacher';
import { TeacherAvatar } from '../../domain/TeacherAvatar';
import { TeacherEmail } from '../../domain/TeacherEmail';
import { TeacherLastName } from '../../domain/TeacherLastName';
import { TeacherName } from '../../domain/TeacherName';
import { TeacherPassword } from '../../domain/TeacherPassword';
import { TeacherRepository } from '../../domain/TeacherRepository';

@Injectable()
export class CreateTeacherService {
  constructor(
    @Inject('TeacherRepository')
    private repository: TeacherRepository,
    private eventBus: EventBus,
  ) {}

  async run(
    id: TeacherId,
    name: TeacherName,
    lastname: TeacherLastName,
    email: TeacherEmail,
    password: TeacherPassword,
    avatar: TeacherAvatar,
  ) {
    const teacher = Teacher.create(id, name, lastname, email, password, avatar);
    const events = teacher.pullEvents();

    await this.repository.save(teacher);

    this.eventBus.publishAll(events);
  }
}

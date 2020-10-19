import { CommandHandler } from '@nestjs/cqrs';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { TeacherAvatar } from '../../domain/TeacherAvatar';
import { TeacherEmail } from '../../domain/TeacherEmail';
import { TeacherLastName } from '../../domain/TeacherLastName';
import { TeacherName } from '../../domain/TeacherName';
import { TeacherPassword } from '../../domain/TeacherPassword';
import { CreateTeacherCommand } from './CreateTeacherCommand';
import { CreateTeacherService } from './CreateTeacherService';

@CommandHandler(CreateTeacherCommand)
export class CreateTeacherHandler {
  constructor(private service: CreateTeacherService) {}

  async execute(command: CreateTeacherCommand) {
    await this.service.run(
      new TeacherId(command.id),
      new TeacherName(command.name),
      new TeacherLastName(command.lastname),
      new TeacherEmail(command.email),
      new TeacherPassword(command.password),
      new TeacherAvatar(command.avatar),
    );

    return;
  }
}

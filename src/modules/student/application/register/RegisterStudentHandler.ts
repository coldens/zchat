import { CommandHandler } from '@nestjs/cqrs';
import { StudentId } from '../../../shared/domain/ValueObjects/StudentId';
import { StudentAvatar } from '../../domain/StudentAvatar';
import { StudentEmail } from '../../domain/StudentEmail';
import { StudentName } from '../../domain/StudentName';
import { RegisterStudentCommand } from './RegisterStudentCommand';
import { RegisterStudentService } from './RegisterStudentService';

@CommandHandler(RegisterStudentCommand)
export class RegisterStudentHandler {
  constructor(private service: RegisterStudentService) {}

  async execute(command: RegisterStudentCommand) {
    await this.service.run(
      new StudentId(command.id),
      new StudentName(command.name),
      new StudentEmail(command.email),
      new StudentAvatar(command.avatar),
    );
  }
}

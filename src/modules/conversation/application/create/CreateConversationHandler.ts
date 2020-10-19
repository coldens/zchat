import { CommandHandler } from '@nestjs/cqrs';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { StudentId } from '../../../shared/domain/ValueObjects/StudentId';
import { ConversationStartedAt } from '../../domain/ConversationStartedAt';
import { CreateConversationCommand } from './CreateConversationCommand';
import { CreateConversationService } from './CreateConversationService';

@CommandHandler(CreateConversationCommand)
export class CreateConversationHandler {
  constructor(private service: CreateConversationService) {}

  execute(command: CreateConversationCommand): Promise<void> {
    return this.service.run(
      new ConversationId(command.id),
      new CourseId(command.courseId),
      new StudentId(command.studentId),
      new ConversationStartedAt(new Date(command.startedAt)),
    );
  }
}

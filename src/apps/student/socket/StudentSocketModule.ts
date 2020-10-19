import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmitMessageToStudentConversationOnMessageCreated } from './EmitMessageToStudentConversationOnMessageCreated';
import { StudentSocketGateway } from './StudentSocketGateway';

@Module({
  imports: [CqrsModule],
  providers: [
    StudentSocketGateway,
    EmitMessageToStudentConversationOnMessageCreated,
  ],
})
export class StudentSocketModule {}

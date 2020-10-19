import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmitMessageToTeacherConversationOnMessageCreated } from './teacher/EmitMessageToTeacherConversationOnMessageCreated';
import { TeacherSocketGateway } from './teacher/TeacherSocketGateway';

@Module({
  imports: [CqrsModule],
  providers: [
    TeacherSocketGateway,
    EmitMessageToTeacherConversationOnMessageCreated,
  ],
})
export class TeacherSocketModule {}

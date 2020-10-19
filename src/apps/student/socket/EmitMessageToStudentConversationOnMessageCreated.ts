import { EventsHandler, QueryBus } from '@nestjs/cqrs';
import { FindMessageQuery } from '../../../modules/message/application/find/FindMessageQuery';
import { MessageCreated as MessageCreatedEvent } from '../../../modules/message/domain/MessageCreated';
import { FindStudentQuery } from '../../../modules/student/application/find/FindStudentQuery';
import { FindTeacherQuery } from '../../../modules/teacher/application/find/FindTeacherQuery';
import { StudentSocketGateway } from './StudentSocketGateway';

@EventsHandler(MessageCreatedEvent)
export class EmitMessageToStudentConversationOnMessageCreated {
  constructor(
    private socket: StudentSocketGateway,
    private queryBus: QueryBus,
  ) {}

  async handle(event: MessageCreatedEvent) {
    const message = await this.queryBus.execute(
      new FindMessageQuery(event.messageId),
    );

    const { name, avatar } = await this.getFrom(message.from);
    message.from = { ...message.from, name, avatar };

    this.socket.newMessage(message);
  }

  private async getFrom(params: {
    type: string;
    value: string;
  }): Promise<{ name: string; avatar: string }> {
    if (params.type === 'student') {
      const { name, avatar } = await this.queryBus.execute(
        new FindStudentQuery(params.value),
      );

      return { name, avatar };
    }
    if (params.type === 'teacher') {
      const { name, avatar } = await this.queryBus.execute(
        new FindTeacherQuery(params.value),
      );

      return { name, avatar };
    }
  }
}

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { isMatch } from 'lodash';
import { Server, Socket } from 'socket.io';
import { FindConversationQuery } from '../../../modules/conversation/application/find/FindConversationQuery';
import { SetMessageReadedCommand } from '../../../modules/message/application/reader/SetMessageReadedCommand';

@WebSocketGateway({ namespace: 'student' })
export class StudentSocketGateway {
  @WebSocketServer()
  readonly server: Server;

  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @SubscribeMessage('message.read')
  async messageRead(@MessageBody() messageId: string) {
    await this.commandBus.execute(new SetMessageReadedCommand(messageId));
  }

  @SubscribeMessage('join.conversation')
  async join(client: Socket, { conversationId, courseId, studentId }) {
    const conversation = await this.queryBus.execute(
      new FindConversationQuery(conversationId),
    );

    if (isMatch(conversation, { courseId, studentId })) {
      client.join(conversationId);
    }
  }

  newMessage(message: any) {
    this.server.in(message.conversationId).emit('new.message', message);
  }
}

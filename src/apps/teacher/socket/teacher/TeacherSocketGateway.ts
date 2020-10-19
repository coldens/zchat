import { CommandBus } from '@nestjs/cqrs';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SetMessageReadedCommand } from '../../../../modules/message/application/reader/SetMessageReadedCommand';

@WebSocketGateway({ namespace: 'teacher' })
export class TeacherSocketGateway {
  @WebSocketServer()
  readonly server: Server;

  constructor(private commandBus: CommandBus) {}

  @SubscribeMessage('message.read')
  async messageRead(@MessageBody() messageId: string) {
    await this.commandBus.execute(new SetMessageReadedCommand(messageId));
  }

  @SubscribeMessage('join.conversation')
  async join(client: Socket, conversationId: string) {
    client.join(conversationId);
  }

  newMessage(message: any) {
    this.server.in(message.conversationId).emit('new.message', message);
  }
}

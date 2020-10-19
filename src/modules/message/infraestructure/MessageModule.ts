import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from '../../shared/infraestructure/mongo/MongoModule';
import { CreateMessageHandler } from '../application/create/CreateMessageHandler';
import { CreateMessageService } from '../application/create/CreateMessageService';
import { FindMessageHandler } from '../application/find/FindMessageHandler';
import { FindMessageService } from '../application/find/FindMessageService';
import { FindForDateMessageHandler } from '../application/findForDate/FindForDateMessageHandler';
import { FindForDateMessageService } from '../application/findForDate/FindForDateMessageService';
import { FindMessagesForConversationHandler } from '../application/findMessagesForConversation/FindMessagesForConversationHandler';
import { FindMessagesForConversationService } from '../application/findMessagesForConversation/FindMessagesForConversationService';
import { MessageReaderService } from '../application/reader/MessageReaderService';
import { SetMessageReadedHandler } from '../application/reader/SetMessageReadedHandler';
import { MongoMessageRepository } from './MongoMessageRepository';

const commandHandlers = [CreateMessageHandler, SetMessageReadedHandler];
const queryHandlers = [
  FindMessagesForConversationHandler,
  FindMessageHandler,
  FindForDateMessageHandler,
];
const services = [
  CreateMessageService,
  FindMessagesForConversationService,
  FindMessageService,
  MessageReaderService,
  FindForDateMessageService,
];

@Module({
  imports: [MongoModule, CqrsModule],
  providers: [
    {
      provide: 'MessageRepository',
      useClass: MongoMessageRepository,
    },
    // Handlers
    ...commandHandlers,
    ...queryHandlers,

    // Services
    ...services,
  ],
  exports: [...commandHandlers, ...queryHandlers, ...services],
})
export class MessageModule {}

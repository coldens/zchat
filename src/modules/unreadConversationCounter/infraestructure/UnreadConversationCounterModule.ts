import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from '../../shared/infraestructure/mongo/MongoModule';
import { FindUnreadConversationCountersForConversationsHandler } from '../application/FindUnreadConversationCountersForConversations/FindUnreadConversationCountersForConversationsHandler';
import { FindUnreadConversationCountersForConversationsService } from '../application/FindUnreadConversationCountersForConversations/FindUnreadConversationCountersForConversationsService';
import { RecalculateCounterHandler } from '../application/Recalculate/RecalculateCounterHandler';
import { RecalculateCounterOnMessagesChanged } from '../application/Recalculate/RecalculateCounterOnMessagesChanged';
import { RecalculateCounterService } from '../application/Recalculate/RecalculateCounterService';
import { MongoUnreadConverstationCounterRepository } from './MongoUnreadConverstationCounterRepository';

const services = [
  RecalculateCounterService,
  FindUnreadConversationCountersForConversationsService,
];
const eventHandlers = [RecalculateCounterOnMessagesChanged];
const queryHandlers = [FindUnreadConversationCountersForConversationsHandler];
const commandHandlers = [RecalculateCounterHandler];

@Module({
  imports: [CqrsModule, MongoModule],
  providers: [
    {
      provide: 'UnreadConversationCounterRepository',
      useClass: MongoUnreadConverstationCounterRepository,
    },
    ...services,
    ...eventHandlers,
    ...queryHandlers,
    ...commandHandlers,
  ],
  exports: [
    ...services,
    ...eventHandlers,
    ...queryHandlers,
    ...commandHandlers,
  ],
})
export class UnreadConversationCounterModule {}

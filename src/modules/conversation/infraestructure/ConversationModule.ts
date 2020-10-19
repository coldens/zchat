import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from '../../shared/infraestructure/mongo/MongoModule';
import { CreateConversationHandler } from '../application/create/CreateConversationHandler';
import { CreateConversationService } from '../application/create/CreateConversationService';
import { FindConversationHandler } from '../application/find/FindConversationHandler';
import { FindConversationService } from '../application/find/FindConversationService';
import { FindAllConversationHandler } from '../application/findAll/FindAllConversationHandler';
import { FindAllConversationService } from '../application/findAll/FindAllConversationService';
import { FindConversationsForCoursesHandler } from '../application/FindConversationsForCourses/FindConversationsForCoursesHandler';
import { FindConversationsForCoursesService } from '../application/FindConversationsForCourses/FindConversationsForCoursesService';
import { FindManyConversationHandler } from '../application/FindManyConversations/FindManyConversationHandler';
import { FindManyConversationService } from '../application/FindManyConversations/FindManyConversationService';
import { MongoConversationRepository } from './MongoConversationRepository';

const commandHandlers = [CreateConversationHandler];
const queryHandlers = [
  FindConversationHandler,
  FindAllConversationHandler,
  FindConversationsForCoursesHandler,
  FindManyConversationHandler,
];
const services = [
  CreateConversationService,
  FindConversationService,
  FindAllConversationService,
  FindConversationsForCoursesService,
  FindManyConversationService,
];

@Module({
  imports: [MongoModule, CqrsModule],
  providers: [
    {
      provide: 'ConversationRepository',
      useClass: MongoConversationRepository,
    },

    // Handlers
    ...commandHandlers,
    ...queryHandlers,

    // Services
    ...services,
  ],

  exports: [...commandHandlers, ...queryHandlers, ...services],
})
export class ConversationModule {}

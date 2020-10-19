import { Test, TestingModule } from '@nestjs/testing';
import { FindConversationsForCoursesHandler } from '../../../../../src/modules/conversation/application/FindConversationsForCourses/FindConversationsForCoursesHandler';
import { FindConversationsForCoursesService } from '../../../../../src/modules/conversation/application/FindConversationsForCourses/FindConversationsForCoursesService';
import { ConversationRepository } from '../../../../../src/modules/conversation/domain/ConversationRepository';
import { MockConversationRepository } from '../../infraestructure/MockConversationRepository';

describe('FindConversationsForCoursesService', () => {
  let repository: ConversationRepository;
  let service: FindConversationsForCoursesService;
  let handler: FindConversationsForCoursesHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'ConversationRepository',
          useFactory: () => MockConversationRepository,
        },
        FindConversationsForCoursesService,
        FindConversationsForCoursesHandler,
      ],
    }).compile();

    repository = module.get('ConversationRepository');
    service = module.get(FindConversationsForCoursesService);
    handler = module.get(FindConversationsForCoursesHandler);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
    expect(handler).toBeDefined();
  });
});

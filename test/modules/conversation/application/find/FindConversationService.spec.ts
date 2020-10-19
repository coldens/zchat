import { Test, TestingModule } from '@nestjs/testing';
import { FindConversationHandler } from '../../../../../src/modules/conversation/application/find/FindConversationHandler';
import { FindConversationQuery } from '../../../../../src/modules/conversation/application/find/FindConversationQuery';
import { FindConversationService } from '../../../../../src/modules/conversation/application/find/FindConversationService';
import { ConversationRepository } from '../../../../../src/modules/conversation/domain/ConversationRepository';
import { ConversationMother } from '../../domain/ConversationMother';
import { MockConversationRepository } from '../../infraestructure/MockConversationRepository';

describe('FindConversationService', () => {
  let repository: ConversationRepository;
  let handler: FindConversationHandler;
  let service: FindConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'ConversationRepository',
          useFactory: () => MockConversationRepository,
        },
        FindConversationHandler,
        FindConversationService,
      ],
    }).compile();

    repository = module.get('ConversationRepository');
    handler = module.get(FindConversationHandler);
    service = module.get(FindConversationService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(handler).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be conversation found', async () => {
    const givenConversation = ConversationMother.random();

    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(givenConversation);

    const result = await handler.execute(
      new FindConversationQuery(givenConversation.id.value),
    );

    expect(result).toMatchObject(givenConversation.toPrimitives());
  });
});

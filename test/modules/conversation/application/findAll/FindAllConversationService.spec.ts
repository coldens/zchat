import { Test, TestingModule } from '@nestjs/testing';
import { FindAllConversationHandler } from '../../../../../src/modules/conversation/application/findAll/FindAllConversationHandler';
import { FindAllConversationQuery } from '../../../../../src/modules/conversation/application/findAll/FindAllConversationQuery';
import { FindAllConversationService } from '../../../../../src/modules/conversation/application/findAll/FindAllConversationService';
import { ConversationRepository } from '../../../../../src/modules/conversation/domain/ConversationRepository';
import { ConversationMother } from '../../domain/ConversationMother';
import { MockConversationRepository } from '../../infraestructure/MockConversationRepository';

describe('FindAllConversationService', () => {
  let repository: ConversationRepository;
  let handler: FindAllConversationHandler;
  let service: FindAllConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'ConversationRepository',
          useFactory: () => MockConversationRepository,
        },
        FindAllConversationHandler,
        FindAllConversationService,
      ],
    }).compile();

    repository = module.get('ConversationRepository');
    handler = module.get(FindAllConversationHandler);
    service = module.get(FindAllConversationService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(handler).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be conversations found', async () => {
    const givenConversations = ConversationMother.getManyRandom(10, 10);

    jest.spyOn(repository, 'findAll').mockResolvedValueOnce(givenConversations);

    const result = await handler.execute(new FindAllConversationQuery());
    expect(result).toHaveLength(givenConversations.length);
  });
});

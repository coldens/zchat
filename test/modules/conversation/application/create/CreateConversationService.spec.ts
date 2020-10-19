import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateConversationCommand } from '../../../../../src/modules/conversation/application/create/CreateConversationCommand';
import { CreateConversationHandler } from '../../../../../src/modules/conversation/application/create/CreateConversationHandler';
import { CreateConversationService } from '../../../../../src/modules/conversation/application/create/CreateConversationService';
import { ConversationRepository } from '../../../../../src/modules/conversation/domain/ConversationRepository';
import { ConversationMother } from '../../domain/ConversationMother';
import { MockConversationRepository } from '../../infraestructure/MockConversationRepository';

describe('CreateConversationService', () => {
  let handler: CreateConversationHandler;
  let repository: ConversationRepository;
  let service: CreateConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: 'ConversationRepository',
          useFactory: () => MockConversationRepository,
        },
        CreateConversationHandler,
        CreateConversationService,
      ],
    }).compile();

    handler = module.get(CreateConversationHandler);
    repository = module.get('ConversationRepository');
    service = module.get(CreateConversationService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be conversation created', async () => {
    const givenConversation = ConversationMother.random();
    const {
      id,
      courseId,
      studentId,
      startedAt,
    } = givenConversation.toPrimitives();

    jest.spyOn(repository, 'create').mockResolvedValueOnce();

    await handler.execute(
      new CreateConversationCommand(id, courseId, studentId, startedAt),
    );

    expect(repository.create).toBeCalledWith(
      expect.objectContaining(givenConversation),
    );
  });
});

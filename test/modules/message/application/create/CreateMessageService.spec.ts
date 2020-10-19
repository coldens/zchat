import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMessageCommand } from '../../../../../src/modules/message/application/create/CreateMessageCommand';
import { CreateMessageHandler } from '../../../../../src/modules/message/application/create/CreateMessageHandler';
import { CreateMessageService } from '../../../../../src/modules/message/application/create/CreateMessageService';
import { MessageRepository } from '../../../../../src/modules/message/domain/MessageRepository';
import { ConversationMother } from '../../../conversation/domain/ConversationMother';
import { MessageMother } from '../../domain/MessageMother';
import { MockMessageRepository } from '../../infraestructure/MockMessageRepository';

describe('CreateMessageService', () => {
  let handler: CreateMessageHandler;
  let service: CreateMessageService;
  let repository: MessageRepository;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: 'MessageRepository',
          useFactory: () => MockMessageRepository,
        },
        CreateMessageHandler,
        CreateMessageService,
      ],
    }).compile();

    handler = module.get(CreateMessageHandler);
    service = module.get(CreateMessageService);
    repository = module.get('MessageRepository');
    queryBus = module.get(QueryBus);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should be message created', async () => {
    const givenMessage = MessageMother.random();
    const primitives = givenMessage.toPrimitives();

    const spyRepository = jest
      .spyOn(repository, 'create')
      .mockResolvedValueOnce();

    jest
      .spyOn(queryBus, 'execute')
      .mockResolvedValueOnce(ConversationMother.random());

    await handler.execute(
      new CreateMessageCommand(
        primitives.id,
        primitives.conversationId,
        primitives.from,
        primitives.body,
        primitives.submitDate,
        primitives.readed,
      ),
    );

    expect(spyRepository).toBeCalledWith(givenMessage);
  });
});

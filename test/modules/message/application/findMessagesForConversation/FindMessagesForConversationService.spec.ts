import { Test, TestingModule } from '@nestjs/testing';
import { FindMessagesForConversationHandler } from '../../../../../src/modules/message/application/findMessagesForConversation/FindMessagesForConversationHandler';
import { FindMessagesForConversationQuery } from '../../../../../src/modules/message/application/findMessagesForConversation/FindMessagesForConversationQuery';
import { FindMessagesForConversationService } from '../../../../../src/modules/message/application/findMessagesForConversation/FindMessagesForConversationService';
import { MessageRepository } from '../../../../../src/modules/message/domain/MessageRepository';
import { ConversationId } from '../../../../../src/modules/shared/domain/ValueObjects/ConversationId';
import { MessageMother } from '../../domain/MessageMother';
import { MockMessageRepository } from '../../infraestructure/MockMessageRepository';

describe('FindMessagesForConversationService', () => {
  let repository: MessageRepository;
  let handler: FindMessagesForConversationHandler;
  let service: FindMessagesForConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'MessageRepository',
          useFactory: () => MockMessageRepository,
        },
        FindMessagesForConversationHandler,
        FindMessagesForConversationService,
      ],
    }).compile();

    repository = module.get('MessageRepository');
    handler = module.get(FindMessagesForConversationHandler);
    service = module.get(FindMessagesForConversationService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(handler).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be messages are found', async () => {
    const conversationId = ConversationId.random<ConversationId>();
    const givenMessages = MessageMother.getManyRandom(2, 5, conversationId);

    jest
      .spyOn(repository, 'findByCriteria')
      .mockResolvedValueOnce(givenMessages);

    const result = await handler.execute(
      new FindMessagesForConversationQuery(conversationId.value),
    );

    expect(result).toMatchObject(givenMessages.map((g) => g.toPrimitives()));
  });
});

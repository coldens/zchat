import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { FindConversationQuery } from '../../../../../src/modules/conversation/application/find/FindConversationQuery';
import { FindMessageQuery } from '../../../../../src/modules/message/application/find/FindMessageQuery';
import { FindMessagesForConversationQuery } from '../../../../../src/modules/message/application/findMessagesForConversation/FindMessagesForConversationQuery';
import { MessageCreated } from '../../../../../src/modules/message/domain/MessageCreated';
import { RecalculateCounterOnMessagesChanged } from '../../../../../src/modules/unreadConversationCounter/application/Recalculate/RecalculateCounterOnMessagesChanged';
import { RecalculateCounterService } from '../../../../../src/modules/unreadConversationCounter/application/Recalculate/RecalculateCounterService';
import { UnreadConversationCounterRepository } from '../../../../../src/modules/unreadConversationCounter/domain/UnreadConversationCounterRepository';
import { UnreadConversationCounterTotal } from '../../../../../src/modules/unreadConversationCounter/domain/UnreadConversationCounterTotal';
import { ConversationMother } from '../../../conversation/domain/ConversationMother';
import { MessageMother } from '../../../message/domain/MessageMother';
import { MockUnreadConversationCounterRepository } from '../../infraestructure/MockUnreadConversationCounterRepository';

describe('RecalculateCounterService', () => {
  let service: RecalculateCounterService;
  let handler: RecalculateCounterOnMessagesChanged;
  let repository: UnreadConversationCounterRepository;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: 'UnreadConversationCounterRepository',
          useFactory: () => MockUnreadConversationCounterRepository,
        },
        {
          provide: QueryBus,
          useFactory: () => ({ execute: jest.fn() }),
        },
        RecalculateCounterService,
        RecalculateCounterOnMessagesChanged,
      ],
    }).compile();

    repository = module.get('UnreadConversationCounterRepository');
    handler = module.get(RecalculateCounterOnMessagesChanged);
    service = module.get(RecalculateCounterService);
    queryBus = module.get(QueryBus);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(handler).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be unread counter recalculated', async () => {
    const givenConversation = ConversationMother.random();
    const givenMessages = MessageMother.getManyRandom(
      10,
      10,
      givenConversation.id,
    );
    const messageId = givenMessages[0].id;

    jest.spyOn(queryBus, 'execute').mockImplementation((query) => {
      return new Promise((resolve) => {
        if (query instanceof FindMessageQuery) {
          resolve(
            givenMessages.find((m) => m.id.value === query.id).toPrimitives(),
          );
        }
        if (query instanceof FindConversationQuery) {
          resolve(givenConversation.toPrimitives());
        }
        if (query instanceof FindMessagesForConversationQuery) {
          resolve(givenMessages.map((m) => m.toPrimitives()));
        }
      });
    });

    jest.spyOn(repository, 'findByCriteria').mockResolvedValueOnce([]);
    const spySave = jest.spyOn(repository, 'save').mockResolvedValueOnce();

    await handler.handle(new MessageCreated(messageId.value));

    const unreadStudent = givenMessages.filter(
      (m) => m.from.type === 'teacher' && !m.readed.value,
    ).length;
    const unreadTeacher = givenMessages.filter(
      (m) => m.from.type === 'student' && !m.readed.value,
    ).length;

    expect(spySave).toBeCalledWith(
      expect.objectContaining({
        totalStudent: new UnreadConversationCounterTotal(unreadStudent),
        totalCourse: new UnreadConversationCounterTotal(unreadTeacher),
      }),
    );
  });
});

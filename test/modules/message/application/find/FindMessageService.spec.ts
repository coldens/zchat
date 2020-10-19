import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { random } from 'lodash';
import { FindMessageHandler } from '../../../../../src/modules/message/application/find/FindMessageHandler';
import { FindMessageQuery } from '../../../../../src/modules/message/application/find/FindMessageQuery';
import { FindMessageService } from '../../../../../src/modules/message/application/find/FindMessageService';
import { MessageRepository } from '../../../../../src/modules/message/domain/MessageRepository';
import { MessageMother } from '../../domain/MessageMother';
import { MockMessageRepository } from '../../infraestructure/MockMessageRepository';

describe('FindMessageService', () => {
  let handler: FindMessageHandler;
  let service: FindMessageService;
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
        FindMessageHandler,
        FindMessageService,
      ],
    }).compile();

    handler = module.get(FindMessageHandler);
    service = module.get(FindMessageService);
    repository = module.get('MessageRepository');
    queryBus = module.get(QueryBus);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(queryBus).toBeDefined();
  });

  it('should be message found', async () => {
    const givenMessages = MessageMother.getManyRandom(5);

    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce((id) =>
        Promise.resolve(
          givenMessages.find((m) => m.id.value === id.value) ?? null,
        ),
      );

    const randomMessage =
      givenMessages[random(1, givenMessages.length - 1, false)];

    const result = await handler.execute(
      new FindMessageQuery(randomMessage.id.value),
    );

    expect(result).toMatchObject(randomMessage.toPrimitives());
  });
});

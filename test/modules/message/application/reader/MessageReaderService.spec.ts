import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { random } from 'lodash';
import { MessageReaderService } from '../../../../../src/modules/message/application/reader/MessageReaderService';
import { SetMessageReadedCommand } from '../../../../../src/modules/message/application/reader/SetMessageReadedCommand';
import { SetMessageReadedHandler } from '../../../../../src/modules/message/application/reader/SetMessageReadedHandler';
import { Message } from '../../../../../src/modules/message/domain/Message';
import { MessageRepository } from '../../../../../src/modules/message/domain/MessageRepository';
import { MessageMother } from '../../domain/MessageMother';
import { MockMessageRepository } from '../../infraestructure/MockMessageRepository';

describe('MessageReaderService', () => {
  let handler: SetMessageReadedHandler;
  let service: MessageReaderService;
  let repository: MessageRepository;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: 'MessageRepository',
          useFactory: () => MockMessageRepository,
        },
        SetMessageReadedHandler,
        MessageReaderService,
      ],
    }).compile();

    handler = module.get(SetMessageReadedHandler);
    service = module.get(MessageReaderService);
    repository = module.get('MessageRepository');
    eventBus = module.get(EventBus);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be messages has been readed', async () => {
    const givenUnreadMessages = MessageMother.getManyRandom(10, 10);

    jest
      .spyOn(repository, 'findOne')
      .mockImplementation((id) =>
        Promise.resolve<Message | null>(
          givenUnreadMessages.find((g) => g.id.value === id.value) ?? null,
        ),
      );

    jest.spyOn(eventBus, 'publishAll').mockImplementation(() => {});

    const message = givenUnreadMessages[random(1, 9, false)];
    await handler.execute(new SetMessageReadedCommand(message.id.value));

    expect(repository.findOne).toBeCalledWith(
      expect.objectContaining(message.id),
    );
    expect(eventBus.publishAll).toBeCalled();
    expect(repository.update).toBeCalled();
  });
});

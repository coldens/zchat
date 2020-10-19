import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessageId } from '../../../shared/domain/ValueObjects/MessageId';
import { MessageRepository } from '../../domain/MessageRepository';

@Injectable()
export class MessageReaderService {
  constructor(
    @Inject('MessageRepository')
    private messageRepository: MessageRepository,
    private eventBus: EventBus,
  ) {}

  async run(id: MessageId) {
    const message = await this.messageRepository.findOne(id);
    message.read();

    const events = message.pullEvents();
    await this.messageRepository.update(message);

    this.eventBus.publishAll(events);
  }
}

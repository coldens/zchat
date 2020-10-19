import { Inject, Injectable } from '@nestjs/common';
import { MessageId } from '../../../shared/domain/ValueObjects/MessageId';
import { MessageNotFound } from '../../domain/MessageNotFound';
import { MessageRepository } from '../../domain/MessageRepository';

@Injectable()
export class FindMessageService {
  constructor(
    @Inject('MessageRepository')
    private repository: MessageRepository,
  ) {}

  async run(messageId: MessageId) {
    const message = await this.repository.findOne(messageId);
    this.ensureMessageExists(message, messageId);

    return message;
  }

  private ensureMessageExists(message: any, messageId: MessageId) {
    if (message === null) {
      throw new MessageNotFound(messageId);
    }
  }
}

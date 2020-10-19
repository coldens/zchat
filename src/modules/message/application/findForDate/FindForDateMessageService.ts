import { Inject, Injectable } from '@nestjs/common';
import { MessageCriteria, SubmitDateRange } from '../../domain/MessageCriteria';
import { MessageRepository } from '../../domain/MessageRepository';

@Injectable()
export class FindForDateMessageService {
  constructor(
    @Inject('MessageRepository')
    private messageRepository: MessageRepository,
  ) {}

  async run(date: string) {
    const range = SubmitDateRange.fromDate(date);
    const messages = await this.messageRepository.findByCriteria(
      new MessageCriteria({ submitDate: range }),
    );

    return messages;
  }
}

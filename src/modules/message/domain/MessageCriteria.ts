import { Addressable } from '../../shared/domain/ValueObjects/Addressable';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { MessageId } from '../../shared/domain/ValueObjects/MessageId';
import { MessageBody } from './MessageBody';
import { MessageRead } from './MessageRead';
import { MessageSubmitDate } from './MessageSubmitDate';

export class MessageCriteria {
  constructor(
    readonly where?: Where,
    readonly sort: Sort = { by: 'submitDate', dir: 'asc' },
  ) {}
}

type Where = {
  id?: MessageId | MessageId[];
  conversationId?: ConversationId | ConversationId[];
  from?: Addressable;
  body?: MessageBody;
  submitDate?: MessageSubmitDate | SubmitDateRange;
  readed?: MessageRead;
};

type Sort = {
  by: 'id' | 'conversationId' | 'submitDate';
  dir: 'asc' | 'desc';
};

export class SubmitDateRange {
  constructor(readonly start: Date, readonly end: Date) {}

  static fromDate(date: any) {
    const start = new Date(date);
    const end = new Date(date);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 59);

    return new this(start, end);
  }
}

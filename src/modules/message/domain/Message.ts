import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { Addressable } from '../../shared/domain/ValueObjects/Addressable';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { MessageId } from '../../shared/domain/ValueObjects/MessageId';
import { MessageBody } from './MessageBody';
import { MessageCreated } from './MessageCreated';
import { MessageRead } from './MessageRead';
import { MessageReaded } from './MessageReaded';
import { MessageSubmitDate } from './MessageSubmitDate';

export class Message extends AggregateRoot {
  constructor(
    readonly id: MessageId,
    readonly conversationId: ConversationId,
    readonly from: Addressable,
    readonly body: MessageBody,
    readonly submitDate: MessageSubmitDate,
    private _readed: MessageRead,
  ) {
    super();
  }

  static create(
    id: MessageId,
    conversationId: ConversationId,
    from: Addressable,
    body: MessageBody,
    submitDate: MessageSubmitDate,
    readed: MessageRead,
  ) {
    const message = new Message(
      id,
      conversationId,
      from,
      body,
      submitDate,
      readed,
    );
    message.pushEvent(new MessageCreated(id.value));
    return message;
  }

  get readed() {
    return this._readed;
  }

  read() {
    this._readed.read();
    this.pushEvent(new MessageReaded(this.id.value));
    return this;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      conversationId: this.conversationId.value,
      from: this.from.toPrimitives(),
      body: this.body.toPrimitives(),
      submitDate: this.submitDate.value,
      readed: this._readed.value,
    };
  }

  static fromPrimitives(
    id: string,
    conversationId: string,
    from: any,
    body: any,
    submitDate: number | string | Date,
    readed: boolean,
  ) {
    return new Message(
      new MessageId(id),
      new ConversationId(conversationId),
      Addressable.fromPrimitives(from.type, from.value),
      new MessageBody(body.type, body.value),
      new MessageSubmitDate(new Date(submitDate)),
      new MessageRead(readed),
    );
  }
}

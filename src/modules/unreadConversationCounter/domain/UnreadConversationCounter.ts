import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { UnreadConversationCounterId } from '../../shared/domain/ValueObjects/UnreadConversationCounterId';
import { UnreadConversationCounterCreated } from './UnreadConversationCounterCreated';
import { UnreadConversationCounterTotal } from './UnreadConversationCounterTotal';
import { UnreadConversationCounterUpdated } from './UnreadConversationCounterUpdated';

export class UnreadConversationCounter extends AggregateRoot {
  constructor(
    readonly id: UnreadConversationCounterId,
    readonly totalStudent: UnreadConversationCounterTotal,
    readonly totalCourse: UnreadConversationCounterTotal,
    readonly conversationId: ConversationId,
  ) {
    super();
  }

  static create(
    id: UnreadConversationCounterId,
    totalStudent: UnreadConversationCounterTotal,
    totalCourse: UnreadConversationCounterTotal,
    conversationId: ConversationId,
  ) {
    const counter = new this(id, totalStudent, totalCourse, conversationId);
    counter.pushEvent(
      new UnreadConversationCounterCreated(
        counter.id.value,
        counter.conversationId.value,
        counter.totalStudent.value,
        counter.totalCourse.value,
      ),
    );
    return counter;
  }

  setTotalStudent(value: number) {
    this.totalStudent.set(value);

    this.pushEvent(
      new UnreadConversationCounterUpdated(
        this.id.value,
        this.conversationId.value,
        this.totalStudent.value,
        this.totalCourse.value,
      ),
    );
  }

  setTotalCourse(value: number) {
    this.totalCourse.set(value);

    this.pushEvent(
      new UnreadConversationCounterUpdated(
        this.id.value,
        this.conversationId.value,
        this.totalStudent.value,
        this.totalCourse.value,
      ),
    );
  }

  static fromPrimitives(
    id: string,
    totalStudent: number,
    totalCourse: number,
    conversationId: string,
  ) {
    return new this(
      new UnreadConversationCounterId(id),
      new UnreadConversationCounterTotal(totalStudent),
      new UnreadConversationCounterTotal(totalCourse),
      new ConversationId(conversationId),
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      totalStudent: this.totalStudent.value,
      totalCourse: this.totalCourse.value,
      conversationId: this.conversationId.value,
    };
  }
}

import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { StudentId } from '../../shared/domain/ValueObjects/StudentId';
import { ConversationCreated } from './ConversationCreated';
import { ConversationStartedAt } from './ConversationStartedAt';

export class Conversation extends AggregateRoot {
  constructor(
    readonly id: ConversationId,
    readonly courseId: CourseId,
    readonly studentId: StudentId,
    readonly startedAt: ConversationStartedAt,
  ) {
    super();
  }

  static create(
    id: ConversationId,
    courseId: CourseId,
    studentId: StudentId,
    startedAt: ConversationStartedAt,
  ) {
    const conversation = new Conversation(id, courseId, studentId, startedAt);
    conversation.pushEvent(new ConversationCreated(id.value));

    return conversation;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      courseId: this.courseId.value,
      studentId: this.studentId.value,
      startedAt: this.startedAt.value,
    };
  }

  static fromPrimitives(
    id: string,
    courseId: string,
    studentId: string,
    startedAt: string,
  ): Conversation {
    return new Conversation(
      new ConversationId(id),
      new CourseId(courseId),
      new StudentId(studentId),
      new ConversationStartedAt(new Date(startedAt)),
    );
  }
}

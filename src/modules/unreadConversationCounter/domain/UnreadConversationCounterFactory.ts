import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { UnreadConversationCounterId } from '../../shared/domain/ValueObjects/UnreadConversationCounterId';
import { UnreadConversationCounter } from './UnreadConversationCounter';
import { UnreadConversationCounterRepository } from './UnreadConversationCounterRepository';
import { UnreadConversationCounterTotal } from './UnreadConversationCounterTotal';

export class UnreadConversationCounterFactory {
  constructor(private repository: UnreadConversationCounterRepository) {}

  async run(
    conversation: ConversationType,
    unreadStudent: number = 0,
    unreadCourse: number = 0,
  ) {
    const conversationId = new ConversationId(conversation.id);

    /**
     * Si existe lo trae de bd y lo actualiza.
     */
    const result = await this.repository.findByCriteria({ conversationId });
    const found = result[0] ?? null;

    if (found) {
      found.setTotalStudent(unreadStudent);
      found.setTotalCourse(unreadCourse);
      return found;
    }

    /**
     * Si no, se genera uno nuevo.
     */
    return UnreadConversationCounter.create(
      UnreadConversationCounterId.random(),
      new UnreadConversationCounterTotal(unreadStudent),
      new UnreadConversationCounterTotal(unreadCourse),
      new ConversationId(conversation.id),
    );
  }
}

export type ConversationType = {
  id: string;
  courseId: string;
  studentId: string;
  startedAt: string;
};

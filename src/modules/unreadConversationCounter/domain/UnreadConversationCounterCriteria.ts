import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { UnreadConversationCounterId } from '../../shared/domain/ValueObjects/UnreadConversationCounterId';
import { UnreadConversationCounterTotal } from './UnreadConversationCounterTotal';

export interface UnreadConversationCounterCriteria {
  id?: Field<UnreadConversationCounterId>;
  totalStudent?: Field<UnreadConversationCounterTotal>;
  totalCourse?: Field<UnreadConversationCounterTotal>;
  conversationId?: Field<ConversationId>;
}

export type Field<T> = Array<T> | T;

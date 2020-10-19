import { UnreadConversationCounterId } from '../../shared/domain/ValueObjects/UnreadConversationCounterId';
import { UnreadConversationCounter } from './UnreadConversationCounter';
import { UnreadConversationCounterCriteria } from './UnreadConversationCounterCriteria';

export interface UnreadConversationCounterRepository {
  find(
    id: UnreadConversationCounterId,
  ): Promise<UnreadConversationCounter | null>;

  findByCriteria(
    criteria: UnreadConversationCounterCriteria,
  ): Promise<UnreadConversationCounter[]>;

  save(aggregate: UnreadConversationCounter): Promise<void>;
}

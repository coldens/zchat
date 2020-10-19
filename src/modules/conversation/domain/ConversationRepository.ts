import { Nullable } from '../../shared/domain/Nullable';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { Conversation } from './Conversation';
import { ConversationCriteria } from './ConversationCriteria';

export interface ConversationRepository {
  findByCriteria(criteria: ConversationCriteria): Promise<Conversation[]>;
  create(conversation: Conversation): Promise<void>;
  update(conversation: Conversation): Promise<void>;

  findOne(id: ConversationId): Promise<Nullable<Conversation>>;
  findAll(): Promise<Conversation[]>;
}

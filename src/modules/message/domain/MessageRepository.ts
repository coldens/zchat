import { Nullable } from '../../shared/domain/Nullable';
import { MessageId } from '../../shared/domain/ValueObjects/MessageId';
import { Message } from './Message';
import { MessageCriteria } from './MessageCriteria';

export interface MessageRepository {
  create(message: Message): Promise<void>;
  update(message: Message): Promise<void>;
  findOne(messageId: MessageId): Promise<Nullable<Message>>;
  findAll(): Promise<Message[]>;
  findByCriteria(criteria: MessageCriteria): Promise<Message[]>;
}

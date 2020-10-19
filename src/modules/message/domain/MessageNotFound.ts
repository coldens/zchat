import { DomainError } from '../../shared/domain/DomainError';
import { MessageId } from '../../shared/domain/ValueObjects/MessageId';

export class MessageNotFound extends DomainError {
  constructor(messageId: MessageId) {
    super(`message with id <${messageId.value}> not found`);
  }
}

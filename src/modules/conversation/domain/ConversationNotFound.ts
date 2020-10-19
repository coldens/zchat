import { DomainError } from '../../shared/domain/DomainError';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';

export class ConversationNotFound extends DomainError {
  constructor(conversationId: ConversationId) {
    super();

    this.message = `<${conversationId.value}> conversation not found`;
  }
}

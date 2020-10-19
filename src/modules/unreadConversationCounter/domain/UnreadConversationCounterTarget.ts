import { Uuid } from '../../shared/domain/ValueObjects/Uuid';

export class UnreadConversationCounterTarget {
  constructor(readonly value: string) {
    this.ensureValueIsValidUuid(value);
  }

  private ensureValueIsValidUuid(value: string) {
    new Uuid(value);
  }
}

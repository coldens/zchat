import { InvalidArgumentError } from '../../shared/domain/ValueObjects/InvalidArgumentError';

export class UnreadConversationCounterTotal {
  private _value: number;

  constructor(value: number) {
    this.set(value);
  }

  set(value: number) {
    this.ensureIsValidCounter(value);
    this._value = value;
  }

  get value() {
    return this._value;
  }

  private ensureIsValidCounter(value: number) {
    if (value < 0) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> expect a number greater than 0, <${value}> given.`,
      );
    }
  }
}

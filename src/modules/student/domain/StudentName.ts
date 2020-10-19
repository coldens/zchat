import { InvalidArgumentError } from '../../shared/domain/ValueObjects/InvalidArgumentError';

export class StudentName {
  constructor(readonly value: string) {
    this.ensureIsValidName(value);
  }

  private ensureIsValidName(value: string) {
    if (value.trim().length === 0) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> expect a valid name, <${value}> given.`,
      );
    }
  }
}

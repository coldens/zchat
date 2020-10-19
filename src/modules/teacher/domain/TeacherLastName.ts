import { InvalidArgumentError } from '../../shared/domain/ValueObjects/InvalidArgumentError';

export class TeacherLastName {
  constructor(readonly value?: string) {
    if (value) {
      this.ensureIsValidLastName(value);
    }
  }

  private ensureIsValidLastName(value: string) {
    if (value.trim().length === 0) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> expect a valid last name, <${value}> given.`,
      );
    }
  }
}

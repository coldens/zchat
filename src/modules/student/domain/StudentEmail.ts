import { InvalidArgumentError } from '../../shared/domain/ValueObjects/InvalidArgumentError';

export class StudentEmail {
  constructor(readonly value: string) {
    this.ensureIsValidEmailAddress(value);
  }

  private ensureIsValidEmailAddress(value: string) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(value)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> expect a valid email pattern, <${value}> given.`,
      );
    }
  }
}

import { v4 } from 'uuid';
import * as validate from 'uuid-validate';
import { InvalidArgumentError } from './InvalidArgumentError';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.guardIsValidUuid(value);
    this.value = value;
  }

  static random<T extends Uuid>() {
    const value = new this(v4());
    return <T>value;
  }

  protected guardIsValidUuid(value: string) {
    if (!validate(value, 4)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`,
      );
    }
  }
}

export class MessageSubmitDate {
  readonly value: string;

  constructor(value: Date) {
    this.value = value.toISOString();
  }

  static fromDate(value: Date) {
    return new MessageSubmitDate(value);
  }

  toDate() {
    return new Date(this.value);
  }
}

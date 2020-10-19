export class ConversationStartedAt {
  readonly value: string;

  constructor(value: Date) {
    this.value = value.toISOString();
  }

  static now(): ConversationStartedAt {
    return new this(new Date());
  }
}

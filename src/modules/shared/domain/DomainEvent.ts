import { Uuid } from './ValueObjects/Uuid';

export abstract class DomainEvent {
  readonly id: string;
  readonly occurredOn: string;
  abstract readonly eventName: string;

  constructor(id?: string, occurredOn?: string) {
    this.id = id ?? Uuid.random().value;

    this.occurredOn = occurredOn
      ? new Date(occurredOn).toISOString()
      : new Date().toISOString();
  }
}

import { Uuid } from './ValueObjects/Uuid';

export class EventId extends Uuid {
  protected argumentErrorMessage(value: string) {
    return `${value} no corresponde a un identificador de evento valido.`;
  }
}

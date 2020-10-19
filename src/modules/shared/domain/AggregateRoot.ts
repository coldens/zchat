import { DomainEvent } from './DomainEvent';

export abstract class AggregateRoot {
  protected domainEvents: DomainEvent[] = [];

  /**
   * Obtiene los eventos del agregado y los elimina de la instancia
   */
  pullEvents(): DomainEvent[] {
    const events = this.getEvents();
    this.domainEvents = [];

    return events;
  }

  /**
   * Obtiene todos los eventos del agregado
   */
  getEvents() {
    return this.domainEvents;
  }

  /**
   * Agregar evento de dominio
   */
  pushEvent(event: DomainEvent) {
    this.domainEvents.push(event);
  }
}

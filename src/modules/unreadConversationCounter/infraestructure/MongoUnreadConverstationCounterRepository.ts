import { UnreadConversationCounterId } from '../../shared/domain/ValueObjects/UnreadConversationCounterId';
import { MongoRepository } from '../../shared/infraestructure/mongo/MongoRepository';
import { UnreadConversationCounter } from '../domain/UnreadConversationCounter';
import { UnreadConversationCounterCriteria as Criteria } from '../domain/UnreadConversationCounterCriteria';
import { UnreadConversationCounterRepository } from '../domain/UnreadConversationCounterRepository';
import { MongoUnreadConversationCounterCriteriaParser as CriteriaParser } from './MongoUnreadConversationCounterCriteriaParser';

export class MongoUnreadConverstationCounterRepository extends MongoRepository
  implements UnreadConversationCounterRepository {
  async findByCriteria(criteria: Criteria) {
    const query = CriteriaParser.query(criteria);
    const docs = await this.collection()
      .find(query)
      .toArray();

    return docs.map(this.parseToAggregate);
  }

  async find(id: UnreadConversationCounterId) {
    const doc = await this.collection().findOne({ _id: id.value });

    if (doc) {
      return this.parseToAggregate(doc);
    }

    return null;
  }

  async save(aggregate: UnreadConversationCounter): Promise<void> {
    await this.updateOrInsert(this.parseFromAggregate(aggregate));
    return;
  }

  protected moduleName(): string {
    return 'unreadConversationCounter';
  }

  private parseToAggregate(doc: any) {
    return UnreadConversationCounter.fromPrimitives(
      doc._id,
      doc.totalStudent,
      doc.totalCourse,
      doc.conversationId,
    );
  }

  private parseFromAggregate(aggregate: UnreadConversationCounter) {
    return {
      _id: aggregate.id.value,
      totalStudent: aggregate.totalStudent.value,
      totalCourse: aggregate.totalCourse.value,
      conversationId: aggregate.conversationId.value,
    };
  }
}

import { Nullable } from '../../shared/domain/Nullable';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { MongoRepository } from '../../shared/infraestructure/mongo/MongoRepository';
import { Conversation } from '../domain/Conversation';
import { ConversationCriteria } from '../domain/ConversationCriteria';
import { ConversationRepository } from '../domain/ConversationRepository';
import { MongoConversationCriteria } from './MongoConversationCriteria';

export class MongoConversationRepository extends MongoRepository
  implements ConversationRepository {
  protected moduleName(): string {
    return 'conversations';
  }

  async create(conversation: Conversation): Promise<void> {
    await this.insertOne(this.parseToDocument(conversation));
    return;
  }

  async update(conversation: Conversation): Promise<void> {
    await this.updateOne(this.parseToDocument(conversation));
    return;
  }

  async findOne(id: ConversationId): Promise<Nullable<Conversation>> {
    const result = await this.collection().findOne({ _id: id.value });

    if (result) {
      return this.parseToConversation(result);
    }

    return null;
  }

  async findAll() {
    const docs = await this.collection()
      .find()
      .toArray();

    return docs.map(this.parseToConversation);
  }

  async findByCriteria(criteria: ConversationCriteria) {
    const query = MongoConversationCriteria.query(criteria);

    const docs = await this.collection()
      .find(query)
      .toArray();

    return docs.map(this.parseToConversation);
  }

  private parseToDocument(conversation: Conversation) {
    const doc = { _id: conversation.id.value, ...conversation.toPrimitives() };
    delete doc.id;
    return doc;
  }

  private parseToConversation(doc: any): Conversation {
    return Conversation.fromPrimitives(
      doc._id,
      doc.courseId,
      doc.studentId,
      doc.startedAt,
    );
  }
}

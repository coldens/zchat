import { MessageId } from '../../shared/domain/ValueObjects/MessageId';
import { MongoRepository } from '../../shared/infraestructure/mongo/MongoRepository';
import { Message } from '../domain/Message';
import { MessageCriteria } from '../domain/MessageCriteria';
import { MessageRepository } from '../domain/MessageRepository';
import { MongoMessageCriteria } from './MongoMessageCriteria';

export class MongoMessageRepository extends MongoRepository
  implements MessageRepository {
  async create(message: Message): Promise<void> {
    await this.insertOne(this.parseToDocument(message));
  }

  async update(message: Message): Promise<void> {
    await this.updateOne(this.parseToDocument(message));
  }

  async findOne(messageId: MessageId): Promise<Message | null> {
    const result = await this.collection().findOne({ _id: messageId.value });

    if (!result) {
      return null;
    }

    return this.parseToMessage(result);
  }

  async findAll(): Promise<Message[]> {
    const result = await this.collection()
      .find()
      .toArray();

    return result.map(this.parseToMessage);
  }

  async findByCriteria(criteria: MessageCriteria) {
    const mongoCriteria = new MongoMessageCriteria(criteria);
    const query = this.collection()
      .find(mongoCriteria.query())
      .sort(mongoCriteria.sortBy(), mongoCriteria.sortDir());

    const docs = await query.toArray();

    return docs.map(this.parseToMessage);
  }

  private parseToDocument(message: Message) {
    const values: any = { _id: message.id.value, ...message.toPrimitives() };
    delete values.id;
    values.submitDate = new Date(values.submitDate);
    return values;
  }

  private parseToMessage(document: any) {
    return Message.fromPrimitives(
      document._id,
      document.conversationId,
      document.from,
      document.body,
      document.submitDate,
      document.readed,
    );
  }

  moduleName() {
    return 'messages';
  }
}

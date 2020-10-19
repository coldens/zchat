import { TeacherId } from '../../shared/domain/ValueObjects/TeacherId';
import { MongoRepository } from '../../shared/infraestructure/mongo/MongoRepository';
import { Teacher } from '../domain/Teacher';
import { TeacherCriteria } from '../domain/TeacherCriteria';
import { TeacherEmail } from '../domain/TeacherEmail';
import { TeacherRepository } from '../domain/TeacherRepository';
import { MongoTeacherCriteriaParser } from './MongoTeacherCriteriaParser';

export class MongoTeacherRepository extends MongoRepository
  implements TeacherRepository {
  protected moduleName(): string {
    return 'teacher';
  }

  async findByCriteria(criteria: TeacherCriteria): Promise<Teacher[]> {
    const query = MongoTeacherCriteriaParser.query(criteria);
    const docs = await this.collection()
      .find(query)
      .toArray();

    return docs.map(this.parseToAggregate);
  }

  async create(teacher: Teacher) {
    await this.insertOne(this.parseToDocument(teacher));
    return;
  }

  async update(teacher: Teacher) {
    await this.updateOne(this.parseToDocument(teacher));
    return;
  }

  async save(teacher: Teacher) {
    await this.updateOrInsert(this.parseToDocument(teacher));
    return;
  }

  async findOne(id: TeacherId) {
    const doc = await this.collection().findOne({ _id: id.value });

    if (doc) {
      return this.parseToAggregate(doc);
    }

    return null;
  }

  async findByEmail(email: TeacherEmail) {
    const doc = await this.collection().findOne({ email: email.value });

    if (doc) {
      return this.parseToAggregate(doc);
    }

    return null;
  }

  private parseToDocument(aggregate: Teacher) {
    return {
      _id: aggregate.id.value,
      name: aggregate.name.value,
      lastname: aggregate.lastname.value,
      email: aggregate.email.value,
      password: aggregate.password.value,
      avatar: aggregate.avatar.value,
    };
  }

  private parseToAggregate(doc: any) {
    return Teacher.fromPrimitives(
      doc._id,
      doc.name,
      doc.lastname,
      doc.email,
      doc.password,
      doc.avatar,
    );
  }
}

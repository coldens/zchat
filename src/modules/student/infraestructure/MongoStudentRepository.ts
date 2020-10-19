import { StudentId } from '../../shared/domain/ValueObjects/StudentId';
import { MongoRepository } from '../../shared/infraestructure/mongo/MongoRepository';
import { Student } from '../domain/Student';
import { StudentRepository } from '../domain/StudentRepository';

export class MongoStudentRepository extends MongoRepository
  implements StudentRepository {
  async findOne(id: StudentId) {
    const doc = await this.collection().findOne({ _id: id.value });

    if (doc) {
      return this.parseToAggregate(doc);
    }

    return null;
  }

  async findMany(id: StudentId[]) {
    const docs = await this.collection()
      .find({ _id: { $in: id.map((i) => i.value) } })
      .toArray();

    return docs.map(this.parseToAggregate);
  }

  async save(student: Student) {
    await this.updateOrInsert(this.parseToDoc(student));
  }

  private parseToAggregate(doc: any) {
    return Student.fromPrimitives(doc._id, doc.name, doc.email, doc.avatar);
  }

  private parseToDoc(student: Student) {
    return {
      _id: student.id.value,
      name: student.name.value,
      email: student.email.value,
      avatar: student.avatar.value,
    };
  }

  protected moduleName(): string {
    return 'student';
  }
}

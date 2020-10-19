import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { MongoRepository } from '../../shared/infraestructure/mongo/MongoRepository';
import { Course } from '../domain/Course';
import { CourseCriteria } from '../domain/CourseCriteria';
import { CourseRepository } from '../domain/CourseRepository';
import { MongoCourseCriteria } from './MongoCourseCriteria';

export class MongoCourseRepository extends MongoRepository
  implements CourseRepository {
  protected moduleName(): string {
    return 'course';
  }

  async find(id: CourseId) {
    const doc = await this.collection().findOne({ _id: id.value });

    if (doc) {
      return this.parseToAggregate(doc);
    }

    return null;
  }

  async save(course: Course) {
    await this.updateOrInsert(this.parseToDoc(course));
  }

  async findAll() {
    const docs = await this.collection()
      .find()
      .toArray();

    return docs.map(this.parseToAggregate);
  }

  async findByCriteria(criteria: CourseCriteria) {
    const query = MongoCourseCriteria.query(criteria);

    const docs = await this.collection()
      .find(query)
      .toArray();

    return docs.map(this.parseToAggregate);
  }

  private parseToAggregate(doc: any) {
    return Course.fromPrimitives(doc._id, doc.name, doc.avatar);
  }

  private parseToDoc(course: Course) {
    return {
      _id: course.id.value,
      name: course.name.value,
      avatar: course.avatar.value,
    };
  }
}

import { CourseTeacherId } from '../../shared/domain/ValueObjects/CourseTeacherId';
import { MongoRepository } from '../../shared/infraestructure/mongo/MongoRepository';
import { CourseTeacher } from '../domain/CourseTeacher';
import { CourseTeacherCriteria } from '../domain/CourseTeacherCriteria';
import { CourseTeacherRepository } from '../domain/CourseTeacherRepository';
import { MongoCourseTeacherCriteria } from './MongoCourseTeacherCriteria';

export class MongoCourseTeacherRepository extends MongoRepository
  implements CourseTeacherRepository {
  protected moduleName(): string {
    return 'courseTeacher';
  }

  async findByCriteria(criteria: CourseTeacherCriteria) {
    const query = MongoCourseTeacherCriteria.query(criteria);
    const docs = await this.collection()
      .find(query)
      .toArray();

    return docs.map(this.toAggregate);
  }

  async save(aggregate: CourseTeacher): Promise<void> {
    await this.updateOrInsert(this.fromAggregate(aggregate));
  }

  async find(id: CourseTeacherId): Promise<CourseTeacher> {
    const doc = await this.collection().findOne({ _id: id.value });

    if (doc) {
      return this.toAggregate(doc);
    }

    return null;
  }

  private toAggregate(doc: any) {
    return CourseTeacher.fromPrimitives(doc._id, doc.teacherId, doc.courseId);
  }

  private fromAggregate(aggregate: CourseTeacher) {
    return {
      _id: aggregate.id.value,
      teacherId: aggregate.teacherId.value,
      courseId: aggregate.courseId.value,
    };
  }
}

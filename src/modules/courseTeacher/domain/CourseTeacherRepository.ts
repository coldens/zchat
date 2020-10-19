import { CourseTeacherId } from '../../shared/domain/ValueObjects/CourseTeacherId';
import { CourseTeacher } from './CourseTeacher';
import { CourseTeacherCriteria } from './CourseTeacherCriteria';

export interface CourseTeacherRepository {
  save(courseTeacher: CourseTeacher): Promise<void>;
  findByCriteria(criteria: CourseTeacherCriteria): Promise<CourseTeacher[]>;
  find(id: CourseTeacherId): Promise<CourseTeacher | null>;
}

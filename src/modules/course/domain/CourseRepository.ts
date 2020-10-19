import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { Course } from './Course';
import { CourseCriteria } from './CourseCriteria';

export interface CourseRepository {
  findByCriteria(criteria: CourseCriteria): Promise<Course[]>;
  findAll(): Promise<Course[]>;
  find(id: CourseId): Promise<Course | null>;
  save(course: Course): Promise<void>;
}

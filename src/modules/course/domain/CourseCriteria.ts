import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { TeacherId } from '../../shared/domain/ValueObjects/TeacherId';
import { CourseName } from './CourseName';

export interface CourseCriteria {
  readonly id?: CourseId | CourseId[];
  readonly name?: CourseName | CourseName[];
  readonly teacherId?: TeacherId | TeacherId[];
}

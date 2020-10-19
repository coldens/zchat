import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { CourseTeacherId } from '../../shared/domain/ValueObjects/CourseTeacherId';
import { TeacherId } from '../../shared/domain/ValueObjects/TeacherId';

export interface CourseTeacherCriteria {
  id?: CourseTeacherId | CourseTeacherId[];
  teacherId?: TeacherId | TeacherId[];
  courseId?: CourseId | CourseId[];
}

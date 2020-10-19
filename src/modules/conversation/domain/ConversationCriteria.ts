import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { StudentId } from '../../shared/domain/ValueObjects/StudentId';

export interface ConversationCriteria {
  id?: ConversationId | ConversationId[];
  courseId?: CourseId | CourseId[];
  studentId?: StudentId | StudentId[];
}

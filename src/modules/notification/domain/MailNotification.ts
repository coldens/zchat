import { CourseName } from '../../course/domain/CourseName';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { StudentName } from '../../student/domain/StudentName';
import { TeacherEmail } from '../../teacher/domain/TeacherEmail';

export interface MailNotification {
  send(
    conversationId: ConversationId,
    courseId: CourseId,
    studentName: StudentName,
    teacherEmail: TeacherEmail,
    courseName: CourseName,
  ): Promise<void>;
}

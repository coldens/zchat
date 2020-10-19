import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConversationModule } from './conversation/infraestructure/ConversationModule';
import { CourseModule } from './course/infraestructure/CourseModule';
import { CourseTeacherModule } from './courseTeacher/infraestructure/CourseTeacherModule';
import { MessageModule } from './message/infraestructure/MessageModule';
import { NotificationModule } from './notification/infraestructure/NotificationModule';
import { ReportsModule } from './reports/infraestructure/ReportsModule';
import { StudentModule } from './student/infraestructure/StudentModule';
import { TeacherModule } from './teacher/infraestructure/TeacherModule';
import { UnreadConversationCounterModule } from './unreadConversationCounter/infraestructure/UnreadConversationCounterModule';

@Module({
  imports: [
    CqrsModule,
    UnreadConversationCounterModule,
    ConversationModule,
    CourseModule,
    CourseTeacherModule,
    TeacherModule,
    StudentModule,
    MessageModule,
    NotificationModule,
    ReportsModule,
  ],
})
export class BoundedContextModule {}

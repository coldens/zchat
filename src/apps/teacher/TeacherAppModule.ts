import { Module } from '@nestjs/common';
import { AuthModule } from './auth/AuthModule';
import { ConversationHttpModule } from './conversation/ConversationHttpModule';
import { CounterHttpModule } from './counter/CounterHttpModule';
import { CourseHttpModule } from './course/CourseHttpModule';
import { MessageHttpModule } from './message/MessageHttpModule';
import { TeacherSocketModule } from './socket/TeacherSocketModule';
import { StudentHttpModule } from './student/StudentHttpModule';

@Module({
  imports: [
    ConversationHttpModule,
    MessageHttpModule,
    StudentHttpModule,
    CourseHttpModule,
    AuthModule,
    TeacherSocketModule,
    CounterHttpModule,
  ],
})
export class TeacherAppModule {}

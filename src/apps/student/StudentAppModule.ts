import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../shared/auth/JwtStrategy';
import { ProfileGetController } from './auth/get/ProfileGetController';
import { RegisterPostController } from './auth/post/RegisterPostController';
import { RegisterStudentService } from './auth/post/RegisterStudentService';
import { MessageGetController } from './message/get/MessageGetController';
import { MessagePostController } from './message/post/MessagePostController';
import { StudentSocketModule } from './socket/StudentSocketModule';
import { TeacherGetController } from './teacher/get/TeacherGetController';

@Module({
  imports: [
    CqrsModule,
    StudentSocketModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    MessagePostController,
    MessageGetController,
    RegisterPostController,
    ProfileGetController,
    TeacherGetController,
  ],
  providers: [RegisterStudentService, JwtStrategy],
})
export class StudentAppModule {}

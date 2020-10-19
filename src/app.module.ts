import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { BackOfficeAppModule } from './apps/backoffice/BackOfficeAppModule';
import { StudentAppModule } from './apps/student/StudentAppModule';
import { TeacherAppModule } from './apps/teacher/TeacherAppModule';
import { UploadFileHttpModule } from './apps/uploadFile/UploadFileHttpModule';
import { BoundedContextModule } from './modules/BoundedContextModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    BoundedContextModule,
    TeacherAppModule,
    StudentAppModule,
    BackOfficeAppModule,
    UploadFileHttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from '../../shared/infraestructure/mongo/MongoModule';
import { HttpCourseImporter } from '../../shared/infraestructure/providers/HttpCourseProvider';
import { CreateCourseTeacherService } from '../application/create/CreateCourseTeacherService';
import { FindCourseTeacherListForCourseHandler } from '../application/FindCourseTeacherListForCourse/FindCourseTeacherListForCourseHandler';
import { FindCourseTeacherListForCourseService } from '../application/FindCourseTeacherListForCourse/FindCourseTeacherListForCourseService';
import { FindCourseTeacherListForTeacherHandler } from '../application/FindCourseTeacherListForTeacher/FindCourseTeacherListForTeacherHandler';
import { FindCourseTeacherListForTeacherService } from '../application/FindCourseTeacherListForTeacher/FindCourseTeacherListForTeacherService';
import { CourseTeacherImporterService } from '../application/importer/CourseTeacherImporterService';
import { ImportCourseTeacherOnTeacherCreated } from '../application/importer/ImportCourseTeacherOnTeacherCreated';
import { MongoCourseTeacherRepository } from './MongoCourseTeacherRepository';

const services = [
  CreateCourseTeacherService,
  FindCourseTeacherListForTeacherService,
  FindCourseTeacherListForCourseService,
  CourseTeacherImporterService,
];
const eventHandlers = [ImportCourseTeacherOnTeacherCreated];
const commandHandlers = [];
const queryHandlers = [
  FindCourseTeacherListForTeacherHandler,
  FindCourseTeacherListForCourseHandler,
];

@Module({
  imports: [MongoModule, CqrsModule],
  providers: [
    {
      provide: 'CourseTeacherRepository',
      useClass: MongoCourseTeacherRepository,
    },
    HttpCourseImporter,
    ...services,
    ...commandHandlers,
    ...eventHandlers,
    ...queryHandlers,
  ],
  exports: [...services, ...commandHandlers, ...queryHandlers],
})
export class CourseTeacherModule {}

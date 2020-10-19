import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from '../../shared/infraestructure/mongo/MongoModule';
import { HttpCourseImporter } from '../../shared/infraestructure/providers/HttpCourseProvider';
import { CreateCourseHandler } from '../application/create/CreateCourseHandler';
import { CreateCourseService } from '../application/create/CreateCourseService';
import { FindCourseQueryHandler } from '../application/find/FindCourseQueryHandler';
import { FindCourseService } from '../application/find/FindCourseService';
import { FindManyCoursesHandler } from '../application/FindManyCourses/FindManyCoursesHandler';
import { FindManyCoursesService } from '../application/FindManyCourses/FindManyCoursesService';
import { CourseImporterService } from '../application/importer/CourseImporterService';
import { ImportCoursesOnTeacherCreated } from '../application/importer/ImportCoursesOnTeacherCreated';
import { MongoCourseRepository } from './MongoCourseRepository';

const queryHandlers = [FindManyCoursesHandler, FindCourseQueryHandler];
const commandHandlers = [CreateCourseHandler];
const eventHandlers = [ImportCoursesOnTeacherCreated];
const services = [
  CourseImporterService,
  CreateCourseService,
  FindManyCoursesService,
  FindCourseService,
];

@Module({
  imports: [MongoModule, CqrsModule],
  providers: [
    {
      provide: 'CourseRepository',
      useClass: MongoCourseRepository,
    },
    HttpCourseImporter,
    ...queryHandlers,
    ...services,
    ...eventHandlers,
    ...commandHandlers,
  ],
  exports: [...queryHandlers, ...services],
})
export class CourseModule {}

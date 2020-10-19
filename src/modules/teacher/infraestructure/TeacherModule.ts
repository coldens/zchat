import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from '../../shared/infraestructure/mongo/MongoModule';
import { CreateTeacherHandler } from '../application/create/CreateTeacherHandler';
import { CreateTeacherService } from '../application/create/CreateTeacherService';
import { FindTeacherHandler } from '../application/find/FindTeacherHandler';
import { FindTeacherService } from '../application/find/FindTeacherService';
import { FindTeacherByEmailHandler } from '../application/findByEmail/FindTeacherByEmailHandler';
import { FindTeacherByEmailService } from '../application/findByEmail/FindTeacherByEmailService';
import { FindManyTeacherHandler } from '../application/FindManyTeacher/FindManyTeacherHandler';
import { FindManyTeacherService } from '../application/FindManyTeacher/FindManyTeacherService';
import { ImportTeacherService } from '../application/import/ImportTeacherService';
import { HttpTeacherProvider } from './HttpTeacherProvider';
import { MongoTeacherRepository } from './MongoTeacherRepository';

const queryHandlers = [
  FindTeacherByEmailHandler,
  FindTeacherHandler,
  FindManyTeacherHandler,
];
const commandHandlers = [CreateTeacherHandler];
const services = [
  FindTeacherByEmailService,
  CreateTeacherService,
  FindTeacherService,
  ImportTeacherService,
  FindManyTeacherService,
];

@Module({
  imports: [CqrsModule, MongoModule],
  providers: [
    {
      provide: 'TeacherRepository',
      useClass: MongoTeacherRepository,
    },
    HttpTeacherProvider,
    ...queryHandlers,
    ...commandHandlers,
    ...services,
  ],
  exports: [...queryHandlers, ...commandHandlers, ...services],
})
export class TeacherModule {}

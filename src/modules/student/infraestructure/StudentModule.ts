import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from '../../shared/infraestructure/mongo/MongoModule';
import { FindStudentHandler } from '../application/find/FindStudentHandler';
import { FindStudentService } from '../application/find/FindStudentService';
import { FindManyStudentHandler } from '../application/FindManyStudent/FindManyStudentHandler';
import { FindManyStudentService } from '../application/FindManyStudent/FindManyStudentService';
import { RegisterStudentHandler } from '../application/register/RegisterStudentHandler';
import { RegisterStudentService } from '../application/register/RegisterStudentService';
import { MongoStudentRepository } from './MongoStudentRepository';

const queryHandlers = [
  FindStudentHandler,
  RegisterStudentHandler,
  FindManyStudentHandler,
];
const services = [
  FindStudentService,
  RegisterStudentService,
  FindManyStudentService,
];

@Module({
  imports: [MongoModule, CqrsModule],
  providers: [
    {
      provide: 'StudentRepository',
      useClass: MongoStudentRepository,
    },

    ...queryHandlers,
    ...services,
  ],
  exports: [...queryHandlers, ...services],
})
export class StudentModule {}

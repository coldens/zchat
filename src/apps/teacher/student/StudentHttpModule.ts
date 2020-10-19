import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StudentGetController } from './get/StudentGetController';

@Module({
  imports: [CqrsModule],
  controllers: [StudentGetController],
})
export class StudentHttpModule {}

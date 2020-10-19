import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CourseGetController } from './get/CourseGetController';

@Module({
  imports: [CqrsModule],
  controllers: [CourseGetController],
})
export class CourseHttpModule {}

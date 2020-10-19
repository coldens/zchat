import { EventsHandler } from '@nestjs/cqrs';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { TeacherCreated } from '../../../teacher/domain/TeacherCreated';
import { CourseImporterService } from './CourseImporterService';

@EventsHandler(TeacherCreated)
export class ImportCoursesOnTeacherCreated {
  constructor(private service: CourseImporterService) {}

  async handle(event: TeacherCreated) {
    await this.service.run(new TeacherId(event.teacherId));
  }
}

import { EventsHandler } from '@nestjs/cqrs';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { TeacherCreated } from '../../../teacher/domain/TeacherCreated';
import { CourseTeacherImporterService } from './CourseTeacherImporterService';

@EventsHandler(TeacherCreated)
export class ImportCourseTeacherOnTeacherCreated {
  constructor(private service: CourseTeacherImporterService) {}

  async handle(event: TeacherCreated) {
    await this.service.run(new TeacherId(event.teacherId));
  }
}

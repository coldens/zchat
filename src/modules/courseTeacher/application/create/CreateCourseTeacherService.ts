import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { CourseTeacherId } from '../../../shared/domain/ValueObjects/CourseTeacherId';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { CourseTeacher } from '../../domain/CourseTeacher';
import { CourseTeacherRepository } from '../../domain/CourseTeacherRepository';

@Injectable()
export class CreateCourseTeacherService {
  constructor(
    @Inject('CourseTeacherRepository')
    private repository: CourseTeacherRepository,
    private eventBus: EventBus,
  ) {}

  async run(id: CourseTeacherId, teacherId: TeacherId, courseId: CourseId) {
    const course = CourseTeacher.create(id, teacherId, courseId);
    const events = course.pullEvents();

    await this.repository.save(course);
    this.eventBus.publishAll(events);
  }
}

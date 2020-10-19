import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { Course } from '../../domain/Course';
import { CourseAvatar } from '../../domain/CourseAvatar';
import { CourseName } from '../../domain/CourseName';
import { CourseRepository } from '../../domain/CourseRepository';

@Injectable()
export class CreateCourseService {
  constructor(
    @Inject('CourseRepository')
    private repository: CourseRepository,
    private eventBus: EventBus,
  ) {}

  async run(id: CourseId, name: CourseName, avatar: CourseAvatar) {
    const course = Course.create(id, name, avatar);
    const events = course.pullEvents();

    await this.repository.save(course);
    this.eventBus.publishAll(events);
  }
}

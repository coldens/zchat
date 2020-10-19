import { Inject, Injectable } from '@nestjs/common';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { CourseNotFound } from '../../domain/CourseNotFound';
import { CourseRepository } from '../../domain/CourseRepository';

@Injectable()
export class FindCourseService {
  constructor(
    @Inject('CourseRepository')
    private repository: CourseRepository,
  ) {}

  async run(id: CourseId) {
    const student = await this.repository.find(id);

    if (student === null) {
      throw new CourseNotFound(id);
    }

    return student;
  }
}

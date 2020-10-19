import { Inject, Injectable } from '@nestjs/common';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { CourseRepository } from '../../domain/CourseRepository';

@Injectable()
export class FindManyCoursesService {
  constructor(
    @Inject('CourseRepository')
    private repository: CourseRepository,
  ) {}

  async run(ids: CourseId[]) {
    const courses = await this.repository.findByCriteria({ id: ids });
    return courses;
  }
}

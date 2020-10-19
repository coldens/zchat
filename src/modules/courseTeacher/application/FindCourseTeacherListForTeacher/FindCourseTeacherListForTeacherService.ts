import { Inject, Injectable } from '@nestjs/common';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { CourseTeacherRepository } from '../../domain/CourseTeacherRepository';

@Injectable()
export class FindCourseTeacherListForTeacherService {
  constructor(
    @Inject('CourseTeacherRepository')
    private repository: CourseTeacherRepository,
  ) {}

  async run(teacherId: TeacherId) {
    const courseTeacherList = await this.repository.findByCriteria({
      teacherId,
    });

    return courseTeacherList;
  }
}

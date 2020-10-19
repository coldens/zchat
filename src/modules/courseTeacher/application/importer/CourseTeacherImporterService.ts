import { Inject, Injectable } from '@nestjs/common';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { CourseTeacherId } from '../../../shared/domain/ValueObjects/CourseTeacherId';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { HttpCourseImporter } from '../../../shared/infraestructure/providers/HttpCourseProvider';
import { CourseTeacherRepository } from '../../domain/CourseTeacherRepository';
import { CreateCourseTeacherService } from '../create/CreateCourseTeacherService';

@Injectable()
export class CourseTeacherImporterService {
  constructor(
    private provider: HttpCourseImporter,
    private createService: CreateCourseTeacherService,
    @Inject('CourseTeacherRepository')
    private repository: CourseTeacherRepository,
  ) {}

  async run(id: TeacherId) {
    const imported = await this.provider.run(id);
    await Promise.all(
      imported.map((c) => this.create(c.id, id, this.createService)),
    );
  }

  private async create(
    courseId: CourseId,
    teacherId: TeacherId,
    createService: CreateCourseTeacherService,
  ) {
    const courseTeachers = await this.repository.findByCriteria({
      teacherId,
      courseId,
    });

    if (courseTeachers.length > 0) {
      return;
    }

    await createService.run(CourseTeacherId.random(), teacherId, courseId);
  }
}

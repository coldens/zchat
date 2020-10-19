import { Injectable } from '@nestjs/common';
import { TeacherId } from '../../../shared/domain/ValueObjects/TeacherId';
import { HttpCourseImporter } from '../../../shared/infraestructure/providers/HttpCourseProvider';
import { Course } from '../../domain/Course';
import { CreateCourseService } from '../create/CreateCourseService';

@Injectable()
export class CourseImporterService {
  constructor(
    private provider: HttpCourseImporter,
    private createService: CreateCourseService,
  ) {}

  async run(id: TeacherId) {
    const imported = await this.provider.run(id);
    await Promise.all(imported.map((i) => this.create(i, this.createService)));
  }

  private async create(values: Course, createService: CreateCourseService) {
    await createService.run(values.id, values.name, values.avatar);
  }
}

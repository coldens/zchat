import { CommandHandler } from '@nestjs/cqrs';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { CourseAvatar } from '../../domain/CourseAvatar';
import { CourseName } from '../../domain/CourseName';
import { CreateCourseCommand } from './CreateCourseCommand';
import { CreateCourseService } from './CreateCourseService';

@CommandHandler(CreateCourseCommand)
export class CreateCourseHandler {
  constructor(private service: CreateCourseService) {}

  async execute(command: CreateCourseCommand) {
    await this.service.run(
      new CourseId(command.id),
      new CourseName(command.name),
      new CourseAvatar(command.avatar),
    );
  }
}

import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import Axios from 'axios';
import { CreateCourseCommand } from '../modules/course/application/create/CreateCourseCommand';
import { CreateTeacherCommand } from '../modules/teacher/application/create/CreateTeacherCommand';

@Injectable()
export class ImportCoursesAndTeachers implements OnApplicationBootstrap {
  constructor(
    readonly config: ConfigService,
    readonly commandBus: CommandBus,
  ) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    await this.loadCourses();
    await this.loadTeachers();

    Logger.log('Cursos y profesores importados.');
  }

  private async loadCourses() {
    const BASE_URL = this.config.get('ADMIN_URI');
    const { data } = await Axios.get(`${BASE_URL}/api/services/courses`);
    await Promise.all(
      data.map(async (course) => {
        await this.commandBus.execute(
          new CreateCourseCommand(course.uuid, course.name, course.image),
        );
      }),
    );
  }

  private async loadTeachers() {
    const BASE_URL = this.config.get('ADMIN_URI');
    const { data } = await Axios.get(`${BASE_URL}/api/services/teachers`);

    await Promise.all(
      data.map(async (teacher) => {
        await this.commandBus.execute(
          new CreateTeacherCommand(
            teacher.uuid,
            teacher.name,
            teacher.lastname,
            teacher.email,
            teacher.password,
            teacher.avatar,
          ),
        );
      }),
    );
  }
}

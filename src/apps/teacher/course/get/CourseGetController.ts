import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindCourseQuery } from '../../../../modules/course/application/find/FindCourseQuery';
import { FindManyCoursesQuery } from '../../../../modules/course/application/FindManyCourses/FindManyCoursesQuery';
import { FindCourseTeacherListForTeacherQuery } from '../../../../modules/courseTeacher/application/FindCourseTeacherListForTeacher/FindCourseTeacherListForTeacherQuery';
import { JwtAuthGuard } from '../../auth/auth/JwtAuthGuard';

@Controller('teacher/courses')
@UseGuards(JwtAuthGuard)
export class CourseGetController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async index(@Request() req) {
    const teacher = req.user;
    const coursesTeacher: any[] = await this.queryBus.execute(
      new FindCourseTeacherListForTeacherQuery(teacher.id),
    );
    const courses: any[] = await this.queryBus.execute(
      new FindManyCoursesQuery(coursesTeacher.map((ct) => ct.courseId)),
    );

    return courses;
  }

  @Get(':id')
  async show(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    const course = await this.queryBus.execute(new FindCourseQuery(id));
    return course;
  }
}

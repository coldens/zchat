import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { uniq } from 'lodash';
import { FindCourseTeacherListForCourseQuery } from '../../../../modules/courseTeacher/application/FindCourseTeacherListForCourse/FindCourseTeacherListForCourseQuery';
import { FindTeacherQuery } from '../../../../modules/teacher/application/find/FindTeacherQuery';
import { FindManyTeacherQuery } from '../../../../modules/teacher/application/FindManyTeacher/FindManyTeacherQuery';

@Controller('student/teachers')
export class TeacherGetController {
  constructor(private queryBus: QueryBus) {}

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const teacher = await this.queryBus.execute(new FindTeacherQuery(id));
    return teacher;
  }

  @Get()
  async index(
    @Query('courseId')
    courseId?: string,
    @Query('id')
    id: string[] = [],
  ) {
    const courseTeacherList: any[] = await this.queryBus.execute(
      new FindCourseTeacherListForCourseQuery(courseId),
    );
    const idList = uniq(courseTeacherList.map((ct) => ct.teacherId as string));

    if (idList.length) {
      const teachers = await this.queryBus.execute(
        new FindManyTeacherQuery(idList),
      );

      return teachers;
    }

    return [];
  }
}

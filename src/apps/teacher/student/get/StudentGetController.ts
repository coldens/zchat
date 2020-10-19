import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindStudentQuery } from '../../../../modules/student/application/find/FindStudentQuery';
import { JwtAuthGuard } from '../../auth/auth/JwtAuthGuard';

@Controller('teacher/students')
@UseGuards(JwtAuthGuard)
export class StudentGetController {
  constructor(private queryBus: QueryBus) {}

  @Get(':id')
  async find(@Param('id') id: string) {
    try {
      const student = await this.queryBus.execute(new FindStudentQuery(id));
      return student;
    } catch (err) {}

    return {
      id,
      name: 'Example',
      avatar:
        'https://zegelvirtual.nyc3.digitaloceanspaces.com/assets/dummies/avatars/user.png',
      email: 'jose@example.pe',
    };
  }
}

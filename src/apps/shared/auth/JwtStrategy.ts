import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FindStudentQuery } from '../../../modules/student/application/find/FindStudentQuery';
import { FindTeacherQuery } from '../../../modules/teacher/application/find/FindTeacherQuery';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private queryBus: QueryBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: any) {
    if (payload.type === 'teacher') {
      return await this.validateTeacher(payload);
    }

    return await this.validateStudent(payload);
  }

  async validateTeacher(payload: any) {
    const teacher = await this.queryBus.execute(
      new FindTeacherQuery(payload.id),
    );

    if (teacher) {
      return { ...teacher, password: undefined };
    }

    return null;
  }

  async validateStudent(payload: any) {
    const student = await this.queryBus.execute(
      new FindStudentQuery(payload.id),
    );

    if (student) {
      return student;
    }

    return null;
  }
}

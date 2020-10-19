import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { compare as comparePassword } from 'bcryptjs';
import { FindTeacherByEmailQuery } from '../../../../modules/teacher/application/findByEmail/FindTeacherByEmailQuery';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private queryBus: QueryBus,
  ) {}

  async validateUser(email: string, password: string) {
    const teacher = await this.queryBus.execute(
      new FindTeacherByEmailQuery(email),
    );

    if (!teacher) {
      return null;
    }

    const result = await comparePassword(password, teacher.password);

    if (result) {
      return { ...teacher, password: undefined };
    }

    return null;
  }

  async login(teacher: any) {
    const payload = { id: teacher.id, type: 'teacher' };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('SECRET'),
      }),
    };
  }
}

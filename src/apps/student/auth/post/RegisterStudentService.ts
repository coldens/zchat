import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { RegisterStudentCommand } from '../../../../modules/student/application/register/RegisterStudentCommand';

@Injectable()
export class RegisterStudentService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private commandBus: CommandBus,
  ) {}

  async register({ id, name, email, avatar }) {
    await this.commandBus.execute(
      new RegisterStudentCommand(id, name, email, avatar),
    );

    const access_token = await this.jwtService.signAsync(
      { id, email },
      { secret: this.configService.get('SECRET') },
    );

    return { access_token };
  }
}

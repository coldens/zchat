import {
  Controller,
  Get,
  HttpStatus,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { concat } from 'lodash';
import { FindConversationQuery } from '../../../../modules/conversation/application/find/FindConversationQuery';
import { FindMessagesForConversationQuery } from '../../../../modules/message/application/findMessagesForConversation/FindMessagesForConversationQuery';
import { FindManyStudentQuery } from '../../../../modules/student/application/FindManyStudent/FindManyStudentQuery';
import { FindManyTeacherQuery } from '../../../../modules/teacher/application/FindManyTeacher/FindManyTeacherQuery';
import { StudentAuthGuard } from '../../auth/StudentAuthGuard';

@Controller('student/messages')
@UseGuards(StudentAuthGuard)
export class MessageGetController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async index(
    @Query(
      'conversationId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    conversationId: string,
  ) {
    const conversation = await this.queryBus.execute(
      new FindConversationQuery(conversationId),
    );
    let messages: any[] = await this.queryBus.execute(
      new FindMessagesForConversationQuery(conversation.id),
    );
    const teacherIdList = messages
      .filter((m) => m.from.type === 'teacher')
      .map((m) => m.from.value);
    const studentIdList = messages
      .filter((m) => m.from.type === 'student')
      .map((m) => m.from.value);

    if (teacherIdList.length > 0) {
      const teachers = await this.queryBus.execute(
        new FindManyTeacherQuery(teacherIdList),
      );
      messages = messages.map((m) => {
        if (m.from.type === 'teacher') {
          const teacher = teachers.find((t) => t.id === m.from.value);

          if (teacher) {
            m.from = { ...m.from, ...teacher };
          }
        }
        return m;
      });
    }
    if (studentIdList.length > 0) {
      const students = await this.queryBus.execute(
        new FindManyStudentQuery(studentIdList),
      );
      messages = messages.map((m) => {
        if (m.from.type === 'student') {
          const student = students.find((s) => s.id === m.from.value);

          if (student) {
            m.from = { ...m.from, ...student };
          }
        }
        return m;
      });
    }

    const supportMessage = [
      {
        id: '3011aa88-cc28-476a-877b-da7190188f42',
        conversationId: 'dd707a47-c4c8-4136-935e-61ca070c4cb9',
        from: {
          type: 'teacher',
          value: '66731f67-77ed-474e-bc38-a672afc71a90',
          name: 'Soporte técnico',
          avatar:
            'https://i.ibb.co/Y2cCdGy/kisspng-technical-support-computer-icons-application-softw-5c02c5b3807d75-2663309415436855555263.png',
        },
        body: {
          type: 'text',
          value:
            '¡Hola! recuerda que este medio es solo para soporte académico, si tienes algún problema con la plataforma utiliza el botón de soporte que se encuentra junto al menú o accede directamente con el enlace <a href="https://bit.ly/Soporte_ZV" target="_blank">https://bit.ly/Soporte_ZV</a>',
        },
        submitDate: '2020-08-17T02:37:18.811Z',
        readed: true,
      },
    ];

    messages = concat(supportMessage, messages);

    return { messages };
  }
}

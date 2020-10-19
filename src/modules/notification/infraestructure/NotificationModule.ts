import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { SendEmailOnMessageCreated } from '../application/email/SendEmailOnMessageCreated';
import { SendEmailService } from '../application/email/SendEmailService';
import { MailgunMailNotification } from './MailgunMailNotification';
import { QueueMailNotification } from './QueueMailNotification';
import { QueueMailNotificationProcessor } from './QueueMailNotificationProcessor';

const services = [SendEmailService];
const eventHandlers = [SendEmailOnMessageCreated];

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueueAsync({
      name: 'teacher-mail',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'MailNotification',
      useClass: QueueMailNotification,
    },
    MailgunMailNotification,

    ...services,
    ...eventHandlers,

    QueueMailNotificationProcessor,
  ],
})
export class NotificationModule {}

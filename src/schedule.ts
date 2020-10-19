import { NestFactory } from '@nestjs/core';
import { ScheduleModule } from './ScheduleModule';

/**
 * Ejecutar tareas programadas.
 */
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ScheduleModule);
  await app.close();
}

bootstrap().then(() => process.exit());

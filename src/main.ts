import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as fastifyFileUpload from 'fastify-file-upload';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { DomainErrorFilter } from './apps/shared/filters/DomainErrorFilter';
import { InvalidArgumentErrorFilter } from './apps/shared/filters/InvalidArgumentErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(fastifyFileUpload);
  app.register(require('fastify-cors'));

  app.useGlobalFilters(
    new InvalidArgumentErrorFilter(),
    new DomainErrorFilter(),
  );
  app.use(helmet());

  await app.listen(getPort());
}

const getPort = () => {
  const ENV_PORT = <number>(<unknown>process.env.SERVER_PORT);

  if (ENV_PORT > 0) {
    return ENV_PORT;
  }

  return 3000;
};

bootstrap();

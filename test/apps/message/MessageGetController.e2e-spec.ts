import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('MessageGetController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/teacher/messages (GET)', () => {
    return request(app.getHttpServer())
      .get('/teacher/messages')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});

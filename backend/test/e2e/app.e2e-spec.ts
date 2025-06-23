import { AppModule } from '@/framework/app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import { Server } from 'http';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: Server;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.setGlobalPrefix('api').enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
    await app.init();
    server = app.getHttpServer() as Server;
  });

  it('/ (POST) login validation', () => {
    return request(server)
      .post('/api/v1/login')
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            errorCode: 'BAD_REQUEST',
            errors: ['username must be a string'],
          })
        );
      });
  });

  it('Patch request need login', () => {
    return request(server)
      .patch('/api/v1/leave-request/1')
      .send({ action: 'abc' })
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            errorCode: 'TOKEN_INVALID',
          })
        );
      });
  });

  it('you must be manager to aprrove a request', async () => {
    const agent = request.agent(server);

    await agent.post('/api/v1/login').send({ username: 'employee1' }).expect(201);

    await agent
      .patch('/api/v1/leave-request/1')
      .send({ action: 'approve' })
      .expect(403)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            errorCode: 'FORBIDDEN',
          })
        );
      });
  });
});

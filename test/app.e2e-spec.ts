import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';

describe('User Auth end to end', () => {
  let app: INestApplication;
  let jwtToken: string = '';
  let userCreated;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(() => mongoose.disconnect());

  const newUser = {
    name: 'Testing',
    surname: 'e2e',
    phone: '912345678',
    email: 'testing@test.com',
    password: 'test123456789',
    role: 'administrator',
  };

  describe('Users', () => {
    it('(POST) - Registrarse como usuario', async () => {
      return request(app.getHttpServer())
        .post('/users/register')
        .send(newUser)
        .expect(201)
        .then((res) => {
          expect(res.body.token).toBeDefined();
          userCreated = res.body.user;
        });
    });

    it('(POST) - Loguearse con un usuario registrado', async () => {
      return request(app.getHttpServer())
        .post('/users/login')
        .send({ email: newUser.email, password: newUser.password })
        .expect(201)
        .then((res) => {
          expect(res.body.token).toBeDefined();
          jwtToken = res.body.token;
        });
    });

    it('(GET) - Obtener todos los usuarios (solo admin)', async () => {
      return request(app.getHttpServer())
        .get('/users/')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(1);
        });
    });

    it('(GET) - Obtener usuario por id (solo admin o usuario logueado)', async () => {
      return request(app.getHttpServer())
        .get(`/users/${userCreated?._id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body._id).toEqual(userCreated._id);
        });
    });

    it('(PUT) - Modificar datos del usuario', async () => {
      const user = { surname: 'e2e update' };
      return request(app.getHttpServer())
        .put(`/users/${userCreated._id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(user)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.surname).toEqual(user.surname);
        });
    });

    it('(DELETE) - Eliminar usuario (solo admin)', async () => {
      return request(app.getHttpServer())
        .delete(`/users/${userCreated?._id}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200)
    })
  });
});

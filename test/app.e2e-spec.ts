import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import 'jest-extended';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('App E2E', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Log in to get a token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'usuario_teste',
        password: 'password_teste',
      });

    authToken = loginResponse.body.access_token;
    console.log('Login Response:', loginResponse.body);
    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve criar um novo plano', async () => {
    const response = await request(app.getHttpServer())
      .post('/plans')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'plano teste2',
        description: 'descricao do plano teste2',
        productIds: [1]
      });

      console.log(response)
    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('plano teste2');
  });

  it('deve associar produto em um plano', async () => {
    const response = await request(app.getHttpServer())
      .post('/plans/2/products/3')
      .set('Authorization', `Bearer ${authToken}`)

    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('plano premium');
  });

  it('deve deletar um produto de plano', async () => {
    const response = await request(app.getHttpServer())
      .delete('/plans/2/products/3')
      .set('Authorization', `Bearer ${authToken}`)

    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('plano premium');
  });

  it('deve criar um novo produto', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Produto teste',
        description: 'descricao do produto teste',
      });

    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Produto teste');
  });

  it('deve retornar todos os produtos', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${authToken}`);

      expect([200, 201]).toContain(response.status);
    expect(response.body).toBeInstanceOf(Array);
  });
});

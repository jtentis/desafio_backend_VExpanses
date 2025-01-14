import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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

  it('should create a new product', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Product Test',
        description: 'Description of the product',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Product Test');
  });

  it('should retrieve all products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

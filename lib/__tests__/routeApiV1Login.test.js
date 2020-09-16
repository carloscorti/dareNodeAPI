import request from 'supertest';
import app from '../app';

describe('route /api/v1/login', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });
  it('POST /api/v1/login sends authentication token', async () => {
    const res = await request(app).post('/api/v1/login').send({
      username: 'Spears',
      password: 'spearsblankenship@quotezart.com',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('type');
    expect(res.body).toHaveProperty('expires_in');
  });

  it('POST /api/v1/login sends 401 if user no registred', async () => {
    const res = await request(app).post('/api/v1/login').send({
      username: 'Carlos',
      password: 'spearsblankenship@quotezart.com',
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe(
      'no user registred: check username and password spelling'
    );
  });

  it('POST /api/v1/login sends 400 if no username or password field', async () => {
    const res = await request(app).post('/api/v1/login').send({
      username: 'Carlos',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe(
      'missing or empty username or password fields'
    );
  });
});

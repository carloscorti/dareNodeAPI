import request from 'supertest';
import app from '../app';

const adminAuth = {};
const userAuth = {};

describe('route /api/v1/policies', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });
  beforeAll(async () => {
    const adminRes = await request(app).post('/api/v1/login').send({
      username: 'Britney',
      password: 'britneyblankenship@quotezart.com',
    });

    adminAuth.token = adminRes.body.token;

    const userRes = await request(app).post('/api/v1/login').send({
      username: 'Barnett',
      password: 'barnettblankenship@quotezart.com',
    });

    userAuth.token = userRes.body.token;
  });

  it('GET /api/v1/policies sends all policies list on admin role with pagination limit 10 by default', async () => {
    const res = await request(app)
      .get('/api/v1/policies')
      .set('authorization', `Bearer ${adminAuth.token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('results');
    expect(res.body).toHaveProperty('total');
    expect(res.body.next.limit).toBe(10);
  });

  it('GET /api/v1/policies sends policies regarding user on user role', async () => {
    const res = await request(app)
      .get('/api/v1/policies')
      .set('authorization', `Bearer ${userAuth.token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('results');
    expect(res.body).toHaveProperty('total');
  });

  it('GET /api/v1/policies/:id sends any policy by id on admin role', async () => {
    const res = await request(app)
      .get('/api/v1/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b')
      .set('authorization', `Bearer ${adminAuth.token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0]).not.toHaveProperty('clientId');
  });

  it('GET /api/v1/policies/:id sends 404 if policy not registred', async () => {
    const res = await request(app)
      .get('/api/v1/policies/1112222333')
      .set('authorization', `Bearer ${adminAuth.token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('policy not found');
  });

  it('GET /api/v1/policies/:id sends 403 denies acces to policy by id if user role', async () => {
    const res = await request(app)
      .get('/api/v1/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b')
      .set('authorization', `Bearer ${userAuth.token}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('not acces to that policy');
  });
});

/* eslint-disable quotes */
import request from 'supertest';
import app from '../app';

const adminAuth = {};
const userAuth = {};

describe('route /api/v1/clients', () => {
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

  it('GET /api/v1/clients sends all clients list on admin role with pagination limit 10 by default', async () => {
    const res = await request(app)
      .get('/api/v1/clients')
      .set('authorization', `Bearer ${adminAuth.token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('results');
    expect(res.body).toHaveProperty('total');
    expect(res.body.next.limit).toBe(10);
  });

  it('GET /api/v1/clients sends all clients list on admin role filtered by query string', async () => {
    const nameQuery = 'Barnett';
    const res = await request(app)
      .get(`/api/v1/clients/?name=${nameQuery}`)
      .set('authorization', `Bearer ${adminAuth.token}`);

    expect(res.statusCode).toEqual(200);
    res.body.forEach((client) =>
      expect(client.name).toStrictEqual(expect.stringContaining(nameQuery))
    );
  });

  it('GET /api/v1/clients sends client data regarding user on user role', async () => {
    const res = await request(app)
      .get('/api/v1/clients')
      .set('authorization', `Bearer ${userAuth.token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body[0].name).toBe('Barnett');
    expect(res.body.length).toBe(1);
  });

  it('GET /api/v1/clients/:id sends any client by id on admin role', async () => {
    const res = await request(app)
      .get('/api/v1/clients/44e44268-dce8-4902-b662-1b34d2c10b8e')
      .set('authorization', `Bearer ${adminAuth.token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].name).toBe('Merrill');
  });

  it('GET /api/v1/clients/:id sends 404 if client not registred', async () => {
    const res = await request(app)
      .get('/api/v1/clients/fake_client')
      .set('authorization', `Bearer ${adminAuth.token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('client not found');
  });

  it('GET /api/v1/clients/:id sends 403, denies acces to client by id if user role', async () => {
    const res = await request(app)
      .get('/api/v1/clients/44e44268-dce8-4902-b662-1b34d2c10b8e')
      .set('authorization', `Bearer ${userAuth.token}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('not acces to that client');
  });

  it('GET /api/v1/clients/:id/policies sends any clients policies by client id on admin role', async () => {
    const res = await request(app)
      .get('/api/v1/clients/44e44268-dce8-4902-b662-1b34d2c10b8e/policies')
      .set('authorization', `Bearer ${adminAuth.token}`);

    expect(res.statusCode).toEqual(200);
  });

  it('GET /api/v1/clients/:id/policies sends 403, denies acces to other clients policy on user role', async () => {
    const res = await request(app)
      .get('/api/v1/clients/44e44268-dce8-4902-b662-1b34d2c10b8e/policies')
      .set('authorization', `Bearer ${userAuth.token}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe("not acces to that client's policies");
  });

  it('GET /api/v1/clients/:id/policies sends 404 if client not registred', async () => {
    const res = await request(app)
      .get('/api/v1/clients/fake_client')
      .set('authorization', `Bearer ${adminAuth.token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('client not found');
  });
});

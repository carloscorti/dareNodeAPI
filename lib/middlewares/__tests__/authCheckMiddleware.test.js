import jwt from 'jsonwebtoken';

import authCheckMiddleware from '../authCheckMiddleware';

jest.mock('jsonwebtoken');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const next = jest.fn();

describe('token authentication middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('sends status 400 if no authorization header', () => {
    const req = { headers: {} };
    const res = mockResponse();
    authCheckMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 400,
      message: 'missing or empty Authorization header',
    });
    expect(res.user).not.toBeDefined();
  });

  test('sends status 400 if authorization header has bad format', () => {
    const req = { headers: { authorization: 'token' } };
    const res = mockResponse();
    authCheckMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 400,
      message: 'Format is Authorization: Bearer [token]',
    });
    expect(res.user).not.toBeDefined();
  });

  test('sends status 401 error on token validation', () => {
    console.error = jest.fn();
    const errorMessage = 'error message';
    const errorObject = new Error(errorMessage);
    jwt.verify.mockImplementation(() => {
      throw errorObject;
    });

    const req = { headers: { authorization: 'Bearer token' } };
    const res = mockResponse();
    authCheckMiddleware(req, res, next);
    expect(console.error).toHaveBeenCalledWith(errorObject);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      code: 401,
      message: errorObject.message,
    });
    expect(res.user).not.toBeDefined();
  });

  test('sets req.user with user data if token is validated', () => {
    const userData = { id: 1, name: 'name', email: 'email' };

    jwt.verify.mockImplementation(() => userData);

    const req = { headers: { authorization: 'Bearer token' } };
    const res = {};
    authCheckMiddleware(req, res, next);
    expect(req.user).toBeDefined();
    expect(req.user).toBe(userData);
    expect(next).toHaveBeenCalled();
  });
});

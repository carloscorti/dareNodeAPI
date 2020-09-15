import usernamePaswordCheckMiddleware from '../usernamePaswordCheckMiddleware';

const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const next = jest.fn();

describe('check username and password middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('reutrns 400 if username is missing from body', () => {
    const req = mockRequest({ password: 'boss' });
    const res = mockResponse();
    usernamePaswordCheckMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 400,
      message: 'missing or empty username or password fields',
    });
  });

  test('reutrns 400 if password is missing from body', () => {
    const req = mockRequest({ username: 'boss' });
    const res = mockResponse();
    usernamePaswordCheckMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 400,
      message: 'missing or empty username or password fields',
    });
  });

  test('call next if username and password in req.body', () => {
    const req = mockRequest({ username: 'username', password: 'password' });
    const res = mockResponse();
    usernamePaswordCheckMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

import axios from 'axios';
import getAPIDataMiddleware from '../getAPIDataMiddleware';
import { clientId, clientSecret, tokenURI } from '../../config/keys';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const next = jest.fn();

jest.mock('axios');

describe('get API data middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('reutrns 500 error on fail request', async () => {
    const errorObj = { error: 'error message' };
    console.info = jest.fn();
    axios.post.mockRejectedValue(errorObj);

    const req = {};
    const res = mockResponse();
    const middleContent = getAPIDataMiddleware();
    await middleContent(req, res, next);

    expect(console.info).toHaveBeenCalledWith(errorObj);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      code: 500,
      message: 'ups there was a problem try leater',
    });
  });

  test('sets req.clients when passes first argument', async () => {
    const postData = { data: { token: 'token' } };
    const clientsData = [
      { client: 1, email: '1@1' },
      { client: 2, email: '2@2' },
    ];
    axios.post.mockResolvedValue(postData);

    axios.get.mockResolvedValue({
      data: clientsData,
    });

    const req = {};
    const res = {};
    const middleContent = getAPIDataMiddleware('clientUri');
    await middleContent(req, res, next);

    expect(axios.post).toHaveBeenCalledWith(tokenURI, {
      client_id: clientId,
      client_secret: clientSecret,
    });
    expect(axios.get).toHaveBeenCalledWith('clientUri', {
      headers: {
        Authorization: `Bearer ${postData.data.token}`,
      },
    });
    expect(req.clients).toBe(clientsData);
    expect(next).toHaveBeenCalled();
  });

  test('sets req.policies when passes second argument', async () => {
    const postData = { data: { token: 'token' } };
    const policiesData = [
      { plolicy: 1, amout: 1 },
      { plolicy: 2, amout: 2 },
    ];
    axios.post.mockResolvedValue(postData);

    axios.get.mockResolvedValue({
      data: policiesData,
    });

    const req = {};
    const res = {};
    const middleContent = getAPIDataMiddleware(null, 'policiesUri');
    await middleContent(req, res, next);

    expect(axios.post).toHaveBeenCalledWith(tokenURI, {
      client_id: clientId,
      client_secret: clientSecret,
    });
    expect(axios.get).toHaveBeenCalledWith('policiesUri', {
      headers: {
        Authorization: `Bearer ${postData.data.token}`,
      },
    });

    expect(req.policies).toBe(policiesData);
    expect(next).toHaveBeenCalled();
  });

  test('sets req.clients and req.policies when passes two arguments', async () => {
    const postData = { data: { token: 'token' } };
    const clientsData = [
      { client: 1, email: '1@1' },
      { client: 2, email: '2@2' },
    ];
    const policiesData = [
      { plolicy: 1, amout: 1 },
      { plolicy: 2, amout: 2 },
    ];
    axios.post.mockResolvedValue(postData);

    axios.get.mockImplementation((url) => {
      switch (url) {
        case 'policiesUri':
          return Promise.resolve({ data: policiesData });
        case 'clientUri':
          return Promise.resolve({ data: clientsData });
        default:
          return Promise.resolve({});
      }
    });

    const req = {};
    const res = {};
    const middleContent = getAPIDataMiddleware('clientUri', 'policiesUri');
    await middleContent(req, res, next);

    expect(axios.post).toHaveBeenCalledWith(tokenURI, {
      client_id: clientId,
      client_secret: clientSecret,
    });
    expect(axios.get).toHaveBeenNthCalledWith(1, 'clientUri', {
      headers: {
        Authorization: `Bearer ${postData.data.token}`,
      },
    });
    expect(axios.get).toHaveBeenNthCalledWith(2, 'policiesUri', {
      headers: {
        Authorization: `Bearer ${postData.data.token}`,
      },
    });
    expect(req.clients).toBe(clientsData);
    expect(req.policies).toBe(policiesData);
    expect(next).toHaveBeenCalled();
  });
});

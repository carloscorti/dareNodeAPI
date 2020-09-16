import express from 'express';
import bodyParser from 'body-parser';

import config from './config/keys';

import authRouter from './routers/authRouter';
import policiesRouter from './routers/policiesRouter';
import clientsRoute from './routers/clientsRoute';

import authCheckMiddleware from './middlewares/authCheckMiddleware';
import getAPIDataMiddleware from './middlewares/getAPIDataMiddleware';
import usernamePaswordChekcMiddleware from './middlewares/usernamePaswordCheckMiddleware';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ api: 'dare-assessment' });
});

app.use(
  '/api/v1/login',
  usernamePaswordChekcMiddleware,
  getAPIDataMiddleware(config.clientsURI),
  authRouter()
);

app.use(
  '/api/v1/policies',
  authCheckMiddleware,
  getAPIDataMiddleware(null, config.policiesURI),
  policiesRouter()
);

app.use(
  '/api/v1/clients',
  authCheckMiddleware,
  getAPIDataMiddleware(config.clientsURI, config.policiesURI),
  clientsRoute()
);

app.use((req, res) => {
  res.status(404).send({
    code: 404,
    message: 'unknown url',
  });
});

export default app;

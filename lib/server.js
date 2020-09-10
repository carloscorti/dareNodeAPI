import express from 'express';
import config from './config/keys';
import bodyParser from 'body-parser';
import authRouter from './routers/authRouter';
import policiesRouter from './routers/policiesRouter';

import authCheckMiddleware from './middlewares/authCheckMiddleware';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ api: 'dare-assessment' });
});

app.use('/api/v1', authRouter());

app.use('/api/v1/policies', authCheckMiddleware, policiesRouter());

app.use((req, res) => {
  res.status(404).send({
    code: 404,
    message: 'unknown url',
  });
});

app.listen(config.port, () => {
  console.info(`Running on port ${config.port}...`);
});

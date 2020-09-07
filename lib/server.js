import express from 'express';
import config from './config';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ api: 'hola' });
});

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!<br><a href="/">go back</a>');
});

app.listen(config.port, () => {
  console.info(`Running on port ${config.port}...`);
});

import app from './app';
import config from './config/keys';

app.listen(config.port, () => {
  console.info(`Running on port ${config.port}...`);
});

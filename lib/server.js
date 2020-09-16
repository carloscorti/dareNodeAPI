import app from './app';
import config from './config/keys';

/**
 * call app and executes listen function
 */

app.listen(config.port, () => {
  console.info(`Running on port ${config.port}...`);
});

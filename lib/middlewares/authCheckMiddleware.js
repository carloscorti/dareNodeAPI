import jwt from 'jsonwebtoken';
import { APISecretKey } from '../config/keys';

/**
 * Middleware authCheckMiddleware: checks if authorization header and if it's correctly formated
 * and verifies ahutentication with json web tokens (jwt)
 *
 * @return
 *   - case not authorization header status 400, missing or empty Authorization header
 *   - case incorrect authorization header status 400, Format is Authorization: Bearer [token]
 *   - case error while verify jwt sends status 401, err.message
 *   - case jwt validates authentication sets req.user with user data decoded jwt and call next()
 */

const authCheckMiddleware = (req, res, next) => {
  try {
    // const requiredHeader = req.header('Authorization');
    const requiredHeader = req.headers['authorization'];
    if (requiredHeader) {
      const headerControl = requiredHeader.split(' ');
      if (headerControl.length !== 2 || headerControl[0] !== 'Bearer') {
        return res.status(400).send({
          code: 400,
          message: 'Format is Authorization: Bearer [token]',
        });
      }
      const token = headerControl[1];
      const tokenDecoded = jwt.verify(token, APISecretKey);
      req.user = tokenDecoded;
      return next();
    }
    return res.status(400).send({
      code: 400,
      message: 'missing or empty Authorization header',
    });
  } catch (err) {
    console.error(err);
    return res.status(401).send({
      code: 401,
      message: err.message,
    });
  }
};

export default authCheckMiddleware;

import jwt from 'jsonwebtoken';
import { APISecretKey } from '../config/keys';

const authCheckMiddleware = (req, res, next) => {
  try {
    const requiredHeader = req.header('Authorization');
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

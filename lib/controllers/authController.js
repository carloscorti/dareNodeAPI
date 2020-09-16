import jwt from 'jsonwebtoken';

import { APISecretKey } from '../config/keys';

/**
 * Controller authController: send auth token if user is registred on clients list
 * username must be client name from clients list and password must be client email from clients list
 *
 * @return
 *   - case there isn't any client with client.name === username && client.email === password
 *   sends status 401, no user registred: check username and password spelling
 *   - case there is any client with client.name === username && client.email === password
 *   on clients list sends 401 with validation token, token contains client id, name. imail and role
 */

const authController = (req, res) => {
  const { username, password } = req.body;

  const { clients } = req;

  const loguedUser = clients.find(
    (client) => client.name === username && client.email === password
  );

  if (loguedUser) {
    const { id, name, email, role } = loguedUser;
    const payload = {
      id,
      name,
      email,
      role,
    };

    const token = jwt.sign(payload, APISecretKey, {
      expiresIn: 6 * 60 * 60,
    });

    return res.send({
      token,
      type: 'bearer',
      expires_in: 6 * 60 * 60,
    });
  }
  return res.status(401).send({
    code: 401,
    message: 'no user registred: check username and password spelling',
  });
};

export default authController;

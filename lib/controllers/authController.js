import jwt from 'jsonwebtoken';

import { APISecretKey } from '../config/keys';

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

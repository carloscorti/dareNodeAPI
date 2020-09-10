import express from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { clientId, clientSecret, APISecretKey } from '../config/keys';

const authRouter = () => {
  const router = express.Router();

  router.route('/login').post(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        code: 400,
        message: 'missing or empty username or password fields',
      });
    }

    let clients;

    try {
      const sourceAPIToken = await axios.post(
        'https://dare-nodejs-assessment.herokuapp.com/api/login',
        {
          client_id: clientId,
          client_secret: clientSecret,
        }
      );

      clients = await axios.get(
        'https://dare-nodejs-assessment.herokuapp.com/api/clients',
        {
          headers: {
            Authorization: `Bearer ${sourceAPIToken.data.token}`,
          },
        }
      );
    } catch (err) {
      console.info(err);
      return res.status(500).send({
        code: 500,
        message: 'ups there was a problem try leater',
      });
    }

    const loguedUser = clients.data.find(
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
  });

  return router;
};

export default authRouter;

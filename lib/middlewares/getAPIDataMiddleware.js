import axios from 'axios';
import { clientId, clientSecret, tokenURI } from '../config/keys';

const getAPIDataMiddleware = (clientUri = null, policiesUri = null) => {
  return async (req, res, next) => {
    try {
      const sourceAPIToken = await axios.post(tokenURI, {
        client_id: clientId,
        client_secret: clientSecret,
      });

      if (clientUri) {
        const clients = await axios.get(clientUri, {
          headers: {
            Authorization: `Bearer ${sourceAPIToken.data.token}`,
          },
        });
        req.clients = clients.data;
      }

      if (policiesUri) {
        const policies = await axios.get(policiesUri, {
          headers: {
            Authorization: `Bearer ${sourceAPIToken.data.token}`,
          },
        });
        req.policies = policies.data;
      }

      return next();
    } catch (err) {
      console.info(err);
      return res.status(500).send({
        code: 500,
        message: 'ups there was a problem try leater',
      });
    }
  };
};

export default getAPIDataMiddleware;

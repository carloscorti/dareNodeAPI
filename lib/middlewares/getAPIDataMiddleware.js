import axios from 'axios';
import { clientId, clientSecret, tokenURI } from '../config/keys';

/**
 * Middleware getAPIDataMiddleware: conects to INSURANCE API REST to get data
 *
 * @param  {string} clientUri    uri to fetch clients data, default null
 * @param  {string} policiesUri  uri to fetch policies data, default null
 * @return
 *   - case error while calling INSURANCE API REST sends status 500, ups there was a problem try leater
 *   - case only given clitnsUri param sets req.clients with clients data and call next()
 *   - case only given policiesUri param sets req.policies with policies data and call next()
 *   - case given clitnsUri policiesUri param sets req.clients with clients data and
 *   req.policies with policies data and call next()
 */

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

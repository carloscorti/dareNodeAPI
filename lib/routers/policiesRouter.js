import express from 'express';
import axios from 'axios';
import { clientId, clientSecret } from '../config/keys';
import checkPaginationParams from '../services/checkPaginationParams';
import pagination from '../services/pagination';

const policiesRouter = () => {
  const router = express.Router();

  router.route('/').get(async (req, res) => {
    let policies;

    try {
      const sourceAPIToken = await axios.post(
        'https://dare-nodejs-assessment.herokuapp.com/api/login',
        {
          client_id: clientId,
          client_secret: clientSecret,
        }
      );

      policies = await axios.get(
        'https://dare-nodejs-assessment.herokuapp.com/api/policies',
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

    let policiesByRole;

    switch (req.user.role) {
      case 'user':
        policiesByRole = policies.data.filter(
          (policie) => policie.clientId === req.user.id
        );
        break;
      default:
        policiesByRole = policies.data;
    }

    const policiesByRoleFormat = policiesByRole.map((policie) => {
      delete policie.clientId;
      return policie;
    });

    const limit = checkPaginationParams(req.query.limit, 10);
    const page = checkPaginationParams(req.query.page, 1);

    return res.send(pagination(limit, page, policiesByRoleFormat));
  });

  return router;
};

export default policiesRouter;

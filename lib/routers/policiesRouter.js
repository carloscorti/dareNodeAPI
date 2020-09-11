import express from 'express';

import { policiesURI } from '../config/keys';

import getAPIDataMiddleware from '../middlewares/getAPIDataMiddleware';

import checkPaginationParams from '../services/checkPaginationParams';
import pagination from '../services/pagination';

const policiesRouter = () => {
  const router = express.Router();
  router
    .route('/')
    .get(getAPIDataMiddleware(null, policiesURI), async (req, res) => {
      const { policies } = req;

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

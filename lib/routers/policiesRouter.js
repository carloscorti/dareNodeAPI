/* eslint-disable indent */
import express from 'express';

import checkPaginationParams from '../services/checkPaginationParams';
import pagination from '../services/pagination';

const policiesRouter = () => {
  const router = express.Router();
  router.route('/').get((req, res) => {
    const { policies } = req;

    let policiesByRole;

    switch (req.user.role) {
      case 'user':
        policiesByRole = policies.filter(
          (policie) => policie.clientId === req.user.id
        );
        break;
      default:
        policiesByRole = policies;
    }

    const policiesByRoleFormat = policiesByRole.map((policie) => {
      delete policie.clientId;
      return policie;
    });

    const limit = checkPaginationParams(req.query.limit, 10);
    const page = checkPaginationParams(req.query.page, 1);

    return res.send(pagination(limit, page, policiesByRoleFormat));
  });

  router.route('/:id').get((req, res) => {
    const { id } = req.params;
    const { policies, user } = req;

    const avaiablePolicies = policies.map((policies) => policies.id);

    if (avaiablePolicies.includes(id)) {
      const requiredPolicy = policies.find((policie) => policie.id === id);
      switch (user.role) {
        case 'user':
          return user.id === requiredPolicy.clientId
            ? res.send(requiredPolicy)
            : res.status(403).send({
                code: 403,
                message: 'not acces to that policy',
              });
        default:
          return res.send(requiredPolicy);
      }
    }
    return res.status(404).send({
      code: 404,
      message: 'policie not found',
    });
  });

  return router;
};

export default policiesRouter;

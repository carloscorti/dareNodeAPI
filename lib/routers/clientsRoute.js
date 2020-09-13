import express from 'express';

import checkPaginationParams from '../services/checkPaginationParams';
import pagination from '../services/pagination';

const clientsRouter = () => {
  const router = express.Router();

  router.route('/').get((req, res) => {
    const { limit, page, name } = req.query;
    const { user, clients, policies } = req;

    let clientsByRole;
    let limitChequed;
    let pageChequed;
    let clietnPolicies;

    let clientsByName;
    let regExp;

    switch (user.role) {
      case 'user':
        clientsByRole = clients.find((client) => client.id === user.id);
        clientsByRole.policies = policies.filter(
          (policie) => policie.clientId === user.id
        );
        return res.send(clientsByRole);

      default:
        regExp = new RegExp(name, 'i');
        clientsByName = clients.filter((client) => client.name.match(regExp));

        clietnPolicies = policies.reduce((policiesByClient, policie) => {
          const { id, amountInsured, inceptionDate } = policie;
          policiesByClient[policie.clientId] =
            policiesByClient[policie.clientId] || [];
          policiesByClient[policie.clientId].push({
            id,
            amountInsured,
            inceptionDate,
          });
          return policiesByClient;
        }, {});

        clientsByRole = clientsByName.map((client) => {
          client.policies = clietnPolicies[client.id] || [];
          return client;
        });

        limitChequed = checkPaginationParams(limit, 10);
        pageChequed = checkPaginationParams(page, 1);

        return res.send(pagination(limitChequed, pageChequed, clientsByRole));
    }
  });

  return router;
};

export default clientsRouter;

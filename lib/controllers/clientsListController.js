/* eslint-disable indent */

import filterByQuery from '../services/filterByQuery';
import clientsFormatData from '../services/clientsFormatData';
import checkPaginationParams from '../services/checkPaginationParams';
import pagination from '../services/pagination';

const clientsListController = (req, res) => {
  const { name } = req.query;
  const { user, clients, policies } = req;

  let clientsByRole;

  switch (user.role) {
    case 'user':
      clientsByRole = clientsFormatData(
        [clients.find((client) => client.id === user.id)],
        policies
      );
      break;

    default:
      name
        ? (clientsByRole = clientsFormatData(
            filterByQuery(name, 'name', clients),
            policies
          ))
        : (clientsByRole = clientsFormatData(clients, policies));
  }

  if (clientsByRole.length === 1) {
    return res.send(clientsByRole);
  }

  const limit = checkPaginationParams(req.query.limit, 10);
  const page = checkPaginationParams(req.query.page, 1);

  return res.send(pagination(limit, page, clientsByRole));
};

export default clientsListController;

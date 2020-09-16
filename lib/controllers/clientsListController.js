/* eslint-disable indent */

import filterByQuery from '../services/filterByQuery';
import clientsFormatData from '../services/clientsFormatData';
import checkPaginationParams from '../services/checkPaginationParams';
import pagination from '../services/pagination';

/**
 * Controller clientsListController: sends clients list depending on user role,
 * get the list of clients details paginated and limited to 10 elements by default.
 * This API endpoint access also a filter query to filter by client name,
 * can be accessed by client with role user (it will retrieve its own client details as only element of the list)
 * and admin (it will retrieve all the clients list)
 *
 * @return
 *   - case user with role user sends status 200 with its own properly formated data (not paginated, only one register)
 *   - case user with role admin sends status 200 with all clients list properly formated data
 *   paginated regarding limit and page and filtered if any filter query.
 */

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

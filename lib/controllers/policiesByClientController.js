/* eslint-disable quotes */
/* eslint-disable indent */
import policiesFormatData from '../services/policiesFormatData';

/**
 * Controller policiesByClientController: sends policies lis by client depending on user role,
 * can be accessed by client with role user (it will retrieve its own client policy list)
 * and admin (it will retrieve any client policy list)
 *
 * @return
 *   - case no client with user id on clients list sends status 404, client not found
 *   - case user with role user asks for another client policies sends status 403, not acces to that client's policies
 *   - case user with role user asks one of it's own policy list sends status 200 with properly formated policy data
 *   - case user with role admin asks any client policis list sends status 200 with properly formated policy data
 */

const policiesByClientController = (req, res) => {
  const { id } = req.params;
  const { user, clients, policies } = req;

  const avaiableClients = clients.map((client) => client.id);

  if (avaiableClients.includes(id)) {
    const requiredClient = clients.find((client) => client.id === id);
    const policiesList = policies.filter((policie) => policie.clientId === id);

    switch (user.role) {
      case 'user':
        return user.id === requiredClient.id
          ? res.send(policiesFormatData(policiesList))
          : res.status(403).send({
              code: 403,
              message: "not acces to that client's policies",
            });
      default:
        return res.send(policiesFormatData(policiesList));
    }
  }
  return res.status(404).send({
    code: 404,
    message: 'client not found',
  });
};

export default policiesByClientController;

/* eslint-disable indent */
import clientsFormatData from '../services/clientsFormatData';

/**
 * Controller clientByIdController: sends client by id data depending on user role,
 * can be accessed by client with role user (it will retrieve its own client details)
 * and admin (it will retrieve any client details)
 *
 * @return
 *   - case no client with user id on clients list sends status 404, client not found
 *   - case user with role user asks for another user id sends status 403, not acces to that client
 *   - case user with role user asks it's own id sends status 200 with properly formated client data
 *   - case user with role admin asks any client id sends status 200 with properly formated client data
 */

const clientByIdController = (req, res) => {
  const { id } = req.params;
  const { user, clients, policies } = req;

  const avaiableClients = clients.map((client) => client.id);

  if (avaiableClients.includes(id)) {
    const requiredClient = clients.find((client) => client.id === id);

    switch (user.role) {
      case 'user':
        return user.id === requiredClient.id
          ? res.send(clientsFormatData([requiredClient], policies))
          : res.status(403).send({
              code: 403,
              message: 'not acces to that client',
            });
      default:
        return res.send(clientsFormatData([requiredClient], policies));
    }
  }
  return res.status(404).send({
    code: 404,
    message: 'client not found',
  });
};

export default clientByIdController;

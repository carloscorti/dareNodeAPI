/* eslint-disable indent */
import clientsFormatData from '../services/clientsFormatData';

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

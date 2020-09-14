/* eslint-disable quotes */
/* eslint-disable indent */
import policiesFormatData from '../services/policiesFormatData';

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

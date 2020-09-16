/**
 * Function clientsFormatData: sets required user date format
 * [
 *   {
 *     "id": "string",
 *     "name": "string",
 *     "email": "string",
 *     "role": "string",
 *     "policies": [
 *       {
 *         "id": "string",
 *         "amountInsured": "string",
 *         "inceptionDate": "string"
 *       }
 *     ]
 *   }
 * ]
 *
 * @param  {Array} clientsList  client list to format
 * @param  {Array} policies     complete plocies list to add data on client.policies
 * @return {Array} json with correct clients data format
 */

const clientsFormatData = (clientsList, policies) => {
  const clietnPolicies = policies.reduce((policiesByClient, policy) => {
    const { id, amountInsured, inceptionDate, clientId } = policy;
    policiesByClient[clientId] = policiesByClient[clientId] || [];
    policiesByClient[clientId].push({
      id,
      amountInsured,
      inceptionDate,
    });
    return policiesByClient;
  }, {});

  const formatedClients = clientsList.map((client) => {
    client.policies = clietnPolicies[client.id] || [];
    return client;
  });

  return formatedClients;
};

export default clientsFormatData;

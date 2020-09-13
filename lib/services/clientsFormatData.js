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

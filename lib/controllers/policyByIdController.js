/* eslint-disable indent */

const policyByIdController = (req, res) => {
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
};

export default policyByIdController;

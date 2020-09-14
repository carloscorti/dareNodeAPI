/* eslint-disable indent */
import policiesFormatData from '../services/policiesFormatData';

const policyByIdController = (req, res) => {
  const { id } = req.params;
  const { policies, user } = req;

  const avaiablePolicies = policies.map((policies) => policies.id);

  if (avaiablePolicies.includes(id)) {
    const requiredPolicy = policies.find((policy) => policy.id === id);

    switch (user.role) {
      case 'user':
        return user.id === requiredPolicy.clientId
          ? res.send(policiesFormatData([requiredPolicy]))
          : res.status(403).send({
              code: 403,
              message: 'not acces to that policy',
            });
      default:
        return res.send(policiesFormatData([requiredPolicy]));
    }
  }
  return res.status(404).send({
    code: 404,
    message: 'policy not found',
  });
};

export default policyByIdController;

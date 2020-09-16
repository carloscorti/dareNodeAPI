/* eslint-disable indent */
import policiesFormatData from '../services/policiesFormatData';

/**
 * Controller policyByIdController: sends policies by id data depending on user role,
 * can be accessed by client with role user (it will retrieve its own policy)
 * and admin (it will retrieve any policy)
 *
 * @return
 *   - case no policy with param:id on policies list sends status 404, policy not found
 *   - case user with role user asks for another client policy id sends status 403, not acces to that policy
 *   - case user with role user asks one of it's own policy id sends status 200 with properly formated policy data
 *   - case user with role admin asks any  client policy id sends status 200 with properly formated policy data
 */

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

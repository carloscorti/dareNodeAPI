import checkPaginationParams from '../services/checkPaginationParams';
import pagination from '../services/pagination';

const policiesListController = (req, res) => {
  const { policies } = req;

  let policiesByRole;

  switch (req.user.role) {
    case 'user':
      policiesByRole = policies.filter(
        (policie) => policie.clientId === req.user.id
      );
      break;
    default:
      policiesByRole = policies;
  }

  const policiesByRoleFormat = policiesByRole.map((policie) => {
    delete policie.clientId;
    return policie;
  });

  const limit = checkPaginationParams(req.query.limit, 10);
  const page = checkPaginationParams(req.query.page, 1);

  return res.send(pagination(limit, page, policiesByRoleFormat));
};

export default policiesListController;

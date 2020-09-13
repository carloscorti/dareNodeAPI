import policiesFormatData from '../services/policiesFormatData';
import checkPaginationParams from '../services/checkPaginationParams';
import pagination from '../services/pagination';

const policiesListController = (req, res) => {
  const { user, policies } = req;

  let policiesByRole;

  switch (user.role) {
    case 'user':
      policiesByRole = policiesFormatData(
        policies.filter((policie) => policie.clientId === req.user.id)
      );
      break;

    default:
      policiesByRole = policiesFormatData(policies);
  }

  const limit = checkPaginationParams(req.query.limit, 10);
  const page = checkPaginationParams(req.query.page, 1);

  return res.send(pagination(limit, page, policiesByRole));
};

export default policiesListController;

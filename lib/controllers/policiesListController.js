import policiesFormatData from '../services/policiesFormatData';
import checkPaginationParams from '../services/checkPaginationParams';
import pagination from '../services/pagination';

/**
 * Controller policiesListController: sends clients list depending on user role,
 * Get the list of policies' client paginated and limited to 10 elements by default.
 * Can be accessed by client with role user (it will retrieve its own policies)
 * and admin (it will retrieve all the policies)
 *
 * @return
 *   - case user with role user sends status 200 with its own policies list properly formated data,
 *   paginated regarding limit (limit=10 by default.).
 *   - case user with role admin sends status 200 with all policies list properly formated data,
 *   paginated regarding limit (limit=10 by default.).
 */

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

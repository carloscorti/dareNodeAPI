import express from 'express';

import clientsListController from '../controllers/clientsListController';
import clientByIdController from '../controllers/clientByIdController';
import policiesByClientController from '../controllers/policiesByClientController';

const clientsRouter = () => {
  const router = express.Router();

  router.route('/').get(clientsListController);

  router.route('/:id').get(clientByIdController);

  router.route('/:id/policies').get(policiesByClientController);

  return router;
};

export default clientsRouter;

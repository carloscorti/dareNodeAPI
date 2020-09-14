import express from 'express';

import clientsListController from '../controllers/clientsListController';
import clientByIdController from '../controllers/clientByIdController';

const clientsRouter = () => {
  const router = express.Router();

  router.route('/').get(clientsListController);

  router.route('/:id').get(clientByIdController);

  return router;
};

export default clientsRouter;

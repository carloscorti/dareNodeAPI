/* eslint-disable indent */
import express from 'express';

import clientsListController from '../controllers/clientsListController';

const clientsRouter = () => {
  const router = express.Router();

  router.route('/').get(clientsListController);

  return router;
};

export default clientsRouter;

import express from 'express';

import policiesListController from '../controllers/policiesListController';
import policyByIdController from '../controllers/policyByIdController';

const policiesRouter = () => {
  const router = express.Router();

  router.route('/').get(policiesListController);

  router.route('/:id').get(policyByIdController);

  return router;
};

export default policiesRouter;

import express from 'express';

import authController from '../controllers/authController';

const authRouter = () => {
  const router = express.Router();

  router.route('/login').post(authController);

  return router;
};

export default authRouter;

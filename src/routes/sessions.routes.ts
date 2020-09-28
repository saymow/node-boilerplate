import { Router } from 'express';

import AuthenticateUserService from '../service/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user } = await authenticateUserService.execute({
    email,
    password,
  });

  return res.send({ user });
});

sessionsRouter.get('/', async (req, res) => {
  return res.send();
});

export default sessionsRouter;

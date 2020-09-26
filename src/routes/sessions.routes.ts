import { Router } from 'express';

import AuthenticateUserService from '../service/authenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user } = await authenticateUserService.execute({
      email,
      password,
    });

    return res.send({ user });
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
});

sessionsRouter.get('/', async (req, res) => {
  return res.send();
});

export default sessionsRouter;

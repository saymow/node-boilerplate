import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../service/createUserService';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  try {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return res.send(users);
  } catch (err) {
    return res.status(400).send({ err: err.message });
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      email,
      name,
      password,
    });

    delete user.password;

    return res.status(201).send(user);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

export default usersRouter;

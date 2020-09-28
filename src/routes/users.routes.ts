import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import authenticate from '../middlewares/auth';
import UsersRepository from '../repositories/UsersRepository';

import CreateUserService from '../service/CreateUserService';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

const usersRouter = Router();
const upload = uploadConfig.multer;

usersRouter.get('/', async (req, res) => {
  const usersRepository = getCustomRepository(UsersRepository);

  const users = await usersRepository.find();

  return res.send(users);
});

usersRouter.post('/', async (req, res) => {
  const { email, name, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    email,
    name,
    password,
  });

  delete user.password;

  return res.status(201).send(user);
});

usersRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const { id } = req.user;
    const { filename } = req.file;

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: filename,
    });

    delete user.password;

    return res.send(user);
  }
);

export default usersRouter;

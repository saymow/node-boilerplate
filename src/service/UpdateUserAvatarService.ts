import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Req {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Req): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) throw new AppError('User must be autheticated.', 401);

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

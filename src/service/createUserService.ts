import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const findExistingEmail = await usersRepository.findByEmail(email);

    if (findExistingEmail) throw new AppError('Email already taken', 400);

    const hashedPass = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPass,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

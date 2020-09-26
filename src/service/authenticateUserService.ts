import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import { TOKEN_SECRET } from '../constants';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<void | { user: User & { token: string } }> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) throw new Error('Invalid credentials.');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new Error('Invalid credentials.');

    const token = sign({}, TOKEN_SECRET, {
      subject: user.id,
      expiresIn: '3d',
    });

    return { user: { ...user, token } };
  }
}

export default AuthenticateUserService;

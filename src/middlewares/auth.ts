import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../constants';

import AppError from '../errors/AppError';

interface TokenPaylod {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticate(
  req: Request,
  _: Response,
  next: NextFunction
): void {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError('Unauthorized.', 401);

  const parts = authorization.split(' ');

  if (parts.length !== 2) throw new AppError('Unauthorized', 401);

  const [prefix, token] = parts;

  if (prefix !== 'Bearer') throw new AppError('Unauthorized', 401);

  try {
    const decoded = verify(token, TOKEN_SECRET) as TokenPaylod;

    const { sub: id } = decoded;

    req.user = { id };

    return next();
  } catch {
    throw new AppError('Unauthorized', 401);
  }
}

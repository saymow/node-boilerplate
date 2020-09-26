import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../constants';

interface TokenPaylod {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) throw new Error('Unauthorized.');

  const parts = authorization.split(' ');

  if (parts.length !== 2) throw new Error('Unauthorized');

  const [prefix, token] = parts;

  if (prefix !== 'Bearer') throw new Error('Unauthorized');

  try {
    const decoded = verify(token, TOKEN_SECRET) as TokenPaylod;

    const { sub: id } = decoded;

    req.user = { id };

    return next();
  } catch {
    throw new Error('Unauthorized');
  }
}

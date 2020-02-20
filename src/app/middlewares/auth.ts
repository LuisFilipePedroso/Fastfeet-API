import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import HttpStatus from 'http-status-codes';

import authConfig from '@config/auth';

interface IDecoded {
  id: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = (await promisify(jwt.verify)(
      token,
      authConfig.secret
    )) as IDecoded;

    // @ts-ignore
    req.userId = decoded.id;

    return next();
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid Token' });
  }
};

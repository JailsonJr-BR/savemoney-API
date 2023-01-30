import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import { auth } from '../configs/auth';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      error: 'JWT token não informado',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const {sub: user_id} = jwt.verify(token, auth.secret);

    req.user = {
      id: user_id,

    };

    return next();

  } catch (error) {
    return res.status(401).json({
      error: 'JWT token invalido',
    });
  }
}

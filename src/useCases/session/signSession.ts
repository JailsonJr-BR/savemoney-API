import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
require('bcryptjs');

import jwt = require('jsonwebtoken');

import { auth } from '../../configs/auth';

import { User } from '../../models/User';

export async function signSession(req: Request, res: Response){
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });


    if (!user) {
      return res.json({ message: 'E-mail e/ou senha incorreta' });
    }

    const passwordMatched = await compare(password, String(user.password));

    if(!passwordMatched){
      return res.json({ message: 'E-mail e/ou senha incorreta' });
    }

    const { secret, expiresIn } = auth;

    const token = jwt.sign({}, secret, {
      subject: String(user._id),
      expiresIn
    });

    return res.json({user, token});

  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}



import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
require('bcryptjs');

import { User } from '../../models/User';
import { Balance } from '../../models/Balance';

export async function createUser(req: Request, res: Response){
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hash(password, 8);

    // APPLICATION EXCEPTIONS
    const checkUserExists = await User.findOne({ email });

    if(checkUserExists) {
      return res.json({
        error: 'Este E-mail já está sendo utilizado.',
      });
    }

    if(password.length < 7) {
      return res.json({
        error: 'Senha muito fraca, deve conter pelo menos 8 caracteres',
      });
    }

    const user = await User.create({ name, email, password: hashedPassword });
    const userBalance = await Balance.create({ user_id: user._id });

    res.status(201).json({user, userBalance});
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

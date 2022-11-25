import { Request, Response } from 'express';

import { User } from '../../models/User';
import { Balance } from '../../models/Balance';


export async function listUser(req: Request, res: Response) {
  try {
    const user_id = req.user.id;
    const users = await User.findById(user_id);
    const usersBalance = await Balance.find().where('user_id').equals(user_id);

    res.json({users, usersBalance});
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

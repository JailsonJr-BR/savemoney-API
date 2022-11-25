import { Request, Response } from 'express';

import { Statement, UserModel } from '../../models/Statement';

export async function listStatement(req: Request, res: Response) {
  try {
    const user_id = req.user.id;
    const statement = await Statement.find<UserModel>().where('user_id').equals(user_id);

    res.json(statement);
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

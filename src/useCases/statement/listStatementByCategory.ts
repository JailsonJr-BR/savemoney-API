import { Request, Response } from 'express';

import { Statement, UserModel } from '../../models/Statement';
import { User } from '../../models/User';

export async function listStatementByCategory(req: Request, res: Response) {
  try {
    const { category_id } = req.params;
    const user_id = req.user.id;

    const statement = await Statement.find<UserModel>().where('category_id').equals(category_id).where('user_id').equals(user_id);
    console.log(statement);
    
    res.json(statement);
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

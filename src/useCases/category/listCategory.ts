import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function listCategory(req: Request, res: Response) {
  try {
    const user_id = req.user.id;
    const category = await Category.find().where('user_id').equals(user_id);

    res.json(category);
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

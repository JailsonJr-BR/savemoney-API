import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response){

  const { title } = req.body;
  const user_id = req.user.id;

  try {

    if (!title){
      return res.json({
        error: 'O titlo é obrigatório',
      });
    }

    const createCategory = await Category.create({ title, user_id });

    return res.status(201).json(createCategory);
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

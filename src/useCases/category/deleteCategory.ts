import { Request, Response } from 'express';

import { Category } from '../../models/Category';
import { Statement } from '../../models/Statement';


export async function deleteCategory(req: Request, res: Response) {
  try {
    const { category_id } = req.params;

    const category = await Category.findByIdAndDelete(category_id);
    const updated = await Statement.findOneAndUpdate({ category_id: null }).where('category_id').equals(category_id);

    res.json({category, updated});
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

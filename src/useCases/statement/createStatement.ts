import { Request, Response } from 'express';

import { Statement } from '../../models/Statement';
import { Balance, UserModel } from '../../models/Balance';

export async function createStatement(req: Request, res: Response){

  const { title, description, type, amount, category_id } = req.body;
  const user_id = req.user.id;

  const usersBalance = await Balance.findOne<UserModel>().where('user_id').equals(user_id);

  function updatedBalance(){
    if(type === 'CREDIT') {
      const updatedBalance = usersBalance?.balance + amount;
      return updatedBalance;
    }

    if(type === 'DEBIT') {
      const updatedBalance = Number(usersBalance?.balance) - amount;
      return updatedBalance;
    }
  }

  try {

    if (!title){
      return res.json({
        error: 'O titlo é obrigatório',
      });
    }

    if (type !== 'CREDIT' && type !== 'DEBIT') {
      return res.json({
        error: 'O tipo da operação deve ser CREDIT ou DEBIT',
      });
    }

    if(type === 'DEBIT' && amount > Number(usersBalance?.balance)){
      return res.json({
        error: 'Saldo insulficiente',
      });
    }

    if (!amount){
      return res.json({
        error: 'Valor é obrigatório',
      });
    }

    const createStatement = await Statement.create({ title, description, type, amount, category_id, user_id });
    const updated = await Balance.findOneAndUpdate({ balance: updatedBalance()}).where('user_id').equals(user_id);

    return res.status(201).json({createStatement, updated});
  } catch {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

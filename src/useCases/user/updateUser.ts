import { Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';
require('bcryptjs');

import { User, UserModel } from '../../models/User';

export async function updateUser(req: Request, res: Response){
  try {
    const imagePath = req.file?. filename;
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const user = await User.findById<UserModel>(user_id);

    if(!user) {
      return res.status(400).json({
        error: 'Usuario não encontrado',
      });
    }

    const checkUserExists = await User.findOne({ email });

    if(checkUserExists && user?.email !== email) {
      return res.json({
        error: 'Este E-mail já está sendo utilizado.',
      });
    }


    if(password.length < 7) {
      return res.json({
        error: 'Senha muito fraca, deve conter pelo menos 8 caracteres',
      });
    }

    if(password && !old_password) {
      return res.json({
        error: 'Você precisa informar a senha antiga para definir a nova senha',
      });
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, String(user?.password));

      if(!checkOldPassword) {
        return res.json({
          error: 'Senha antiga não confere',
        });
      }
    }

    const hashedPassword = await hash(password, 8);

    const updateUser = await User.findByIdAndUpdate(user_id, { name, email, password: hashedPassword, imagePath, updated_at: Date.now()});
    
    return res.status(201).json(updateUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

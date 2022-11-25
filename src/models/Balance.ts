import { model, Schema } from 'mongoose';

export type UserModel = {
  balance: number;
}

export const Balance = model('Balance', new Schema({
  balance: {
    type: Number,
    default: 0,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}));

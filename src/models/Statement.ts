import { model, Schema } from 'mongoose';

export type UserModel = {
  amount: number;
}

export const Statement = model('Statement', new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
}));

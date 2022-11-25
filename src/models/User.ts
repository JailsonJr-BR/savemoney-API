import { model, Schema } from 'mongoose';

export type UserModel = {
  name: string;
  email: string;
  password: string;
  balance: number;
  imagePath: string;
  updated_at: Date;
}

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
}));

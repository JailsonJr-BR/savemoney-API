import { model, Schema } from 'mongoose';

export const Category = model('Category', new Schema({
  title: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}));

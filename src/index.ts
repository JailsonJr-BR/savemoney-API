import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { router } from './routes';

mongoose.connect(process.env.DATABASE||'')
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(router);

    app.listen(process.env.PORT||3002, () => {
      console.log('🚀 Server is running');
    });
  })
  .catch(() => console.log('Erro ao conectar no mongodb'));

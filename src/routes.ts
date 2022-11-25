import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { createUser } from './useCases/user/createUser';
import { listUser } from './useCases/user/listUser';
import { updateUser } from './useCases/user/updateUser';

import { signSession } from './useCases/session/signSession';

import { createStatement } from './useCases/statement/createStatement';
import { listStatement } from './useCases/statement/listStatement';

import { ensureAuthenticated } from './middlewares/esnureAuthenticated';

export const router = Router();

const updload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

// Create user
router.post('/user', createUser);

// List user
router.get('/user', ensureAuthenticated, listUser);

// Update user
router.patch('/user', ensureAuthenticated, updload.single('image'), updateUser);

// Create sessions
router.post('/session', signSession);

// Create statement
router.post('/statement', ensureAuthenticated, createStatement);

// List statement
router.get('/statement', ensureAuthenticated, listStatement);

import express from 'express';

import {registerUser,loginUser,getAllUsers,getCurrentUser} from "../controllers/user.js";
import {authenticate} from '../admin/isAdmin.js';

const userRouter=express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', authenticate, getCurrentUser);
userRouter.get('/', authenticate, getAllUsers)
export default userRouter;
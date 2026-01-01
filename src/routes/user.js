import express from 'express';

import {registerUser,loginUser,getAllUsers} from "../controllers/user.js";
import isAdmin, {authenticate} from '../admin/isAdmin.js';

const userRouter=express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', authenticate, isAdmin, getAllUsers)
export default userRouter;
import express from 'express';

import {getAllOrders,addOrder,deleteOrder,getallOrdersFromUser,updateOrder} from "../controllers/order.js";
import {authenticate} from '../admin/isAdmin.js';

const orderRouter=express.Router();

orderRouter.get('/all', authenticate, getAllOrders);
orderRouter.get('/', authenticate, getallOrdersFromUser);
orderRouter.post('/', authenticate, addOrder);
orderRouter.delete('/:id', authenticate, deleteOrder);
orderRouter.put('/:id', authenticate, updateOrder);
export default orderRouter;
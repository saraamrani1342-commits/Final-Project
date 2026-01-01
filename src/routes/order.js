import express from 'express';

import {getAllOrders,addOrder,deleteOrder,getallOrdersFromUser,updateOrder} from "../controllers/order.js";
import isAdmin, {authenticate} from '../admin/isAdmin.js';
import isOrderOwnerOrAdmin from '../admin/isOrderOwnerOrAdmin.js';

const orderRouter=express.Router();

orderRouter.get('/all', authenticate, isAdmin, getAllOrders);
orderRouter.get('/', authenticate, getallOrdersFromUser);
orderRouter.post('/', authenticate, addOrder);
orderRouter.delete('/:id', authenticate, isAdmin, deleteOrder);
orderRouter.put('/:id', authenticate, isOrderOwnerOrAdmin, updateOrder);
export default orderRouter;
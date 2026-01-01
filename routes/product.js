import express from 'express';

import {getAllProducts,getProductById,addProduct,deleteById,updateProduct} from "../controllers/product.js";
import isAdmin, {authenticate} from '../admin/isAdmin.js';

const productRouter=express.Router();
productRouter.get('/:id', getProductById);
productRouter.get('/', getAllProducts);
productRouter.delete('/:id', authenticate, isAdmin, deleteById);
productRouter.post('/', authenticate, isAdmin, addProduct);
productRouter.put('/:id', authenticate, isAdmin, updateProduct);
export default productRouter;


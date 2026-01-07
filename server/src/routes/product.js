import express from 'express';

import {getAllProducts,getProductById,addProduct,deleteById,updateProduct} from "../controllers/product.js";
import {authenticate} from '../admin/isAdmin.js';

const productRouter=express.Router();
productRouter.get('/:id', getProductById);
productRouter.get('/', getAllProducts);
productRouter.delete('/:id', authenticate, deleteById);
productRouter.post('/', authenticate, addProduct);
productRouter.put('/:id', authenticate, updateProduct);
export default productRouter;


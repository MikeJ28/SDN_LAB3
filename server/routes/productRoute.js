import express from 'express';
import { productController } from '../controllers/index.js';

const productRouter = express.Router();

// API_GET: Get all products
productRouter.get('/', productController.getAllProducts);


// API_GET: Get products
productRouter.get('/:id', productController.getProductById);

//API_POST: create product
productRouter.post('/', productController.createProduct);

export default productRouter;


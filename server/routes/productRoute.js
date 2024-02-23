import express from 'express';
import { productController } from '../controllers/index.js';

const productRouter = express.Router();

// API_GET: Get all products
productRouter.get('/', productController.getAllProducts);

export default productRouter;


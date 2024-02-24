import express from 'express';
import { categoryController } from "../controllers/index.js";


const categoryRoute = express.Router();

// API_POST: create category;
categoryRoute.post("/", categoryController.createCategory);

categoryRoute.get("/", categoryController.getAllCategories);

categoryRoute.get("/:id", categoryController.getCategory);

export default categoryRoute;
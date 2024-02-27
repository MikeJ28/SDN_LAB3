import express from "express";
import { commentController } from "../controllers/index.js";

const commentRoute = express.Router();

commentRoute.post("/", commentController.createComment);

commentRoute.put("/", commentController.updateComment);

export default commentRoute;

import express from "express";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../controller/categoryController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/add",authenticateToken, addCategory);
categoryRouter.get("/get", authenticateToken, getCategories);
categoryRouter.put("/update/:name", authenticateToken, updateCategory);
categoryRouter.delete("/delete/:name", authenticateToken, deleteCategory);

export default categoryRouter;
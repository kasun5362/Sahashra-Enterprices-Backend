import express from "express";
import { addCategory, deleteCategory, getCategories } from "../controller/categoryController.js";


const categoryRouter = express.Router();

categoryRouter.post("/add", addCategory);
categoryRouter.get("/get", getCategories);
categoryRouter.delete("/delete/:name", deleteCategory);

export default categoryRouter;
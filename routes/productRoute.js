import express from 'express';
import { addProducts, deleteProduct, getProducts, updateProduct, updateProductStock, updateStockByCancellOrder } from '../controller/productController.js';
import upload from '../utils/cloudinaryConfig.js';
import { authenticateToken } from '../middleware/AuthMiddleware.js';


const productRouter = express.Router();

productRouter.post("/add",authenticateToken, upload.single('image'), addProducts);
productRouter.get("/get", authenticateToken, getProducts);
productRouter.delete("/delete/:productKey", authenticateToken, deleteProduct);
productRouter.put("/update/:productKey", authenticateToken, upload.single('image'), updateProduct);
productRouter.put("/updateProductStock", authenticateToken, updateProductStock);
productRouter.put("/updateStockByCancellOrder", authenticateToken, updateStockByCancellOrder);


export default productRouter;
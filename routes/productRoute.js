import express from 'express';
import { addProducts, deleteProduct, getProducts, updateProduct, updateProductStock, updateStockByCancellOrder } from '../controller/productController.js';
import upload from '../utils/cloudinaryConfig.js';


const productRouter = express.Router();

productRouter.post("/add", upload.single('image'), addProducts);
productRouter.get("/get", getProducts);
productRouter.delete("/delete/:productKey", deleteProduct);
productRouter.put("/update/:productKey", upload.single('image'), updateProduct);
productRouter.put("/updateProductStock", updateProductStock);
productRouter.put("/updateStockByCancellOrder", updateStockByCancellOrder);


export default productRouter;
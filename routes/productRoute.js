import express from 'express';
import { addProducts, deleteProduct, getProducts, updateProduct, updateProductStock, updateStockByCancellOrder } from '../controller/productController.js';


const productRouter = express.Router();

productRouter.post("/add",addProducts);
productRouter.get("/get",getProducts);
productRouter.delete("/delete/:productKey",deleteProduct);
productRouter.put("/update/:productKey",updateProduct);
productRouter.put("/updateProductStock",updateProductStock);
productRouter.put("/updateStockByCancellOrder",updateStockByCancellOrder)


export default productRouter;
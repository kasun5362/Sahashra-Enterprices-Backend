import Product from "../model/product.js";
import { isAdmin, isUser, isUserNull } from "./userController.js";

export async function addProducts(req, res) {
    try {

        if (isUserNull(req)) {
            res.status(401).json({
                message: "Please login to perform this task"
            });
            return
        }

        if (!isAdmin(req)) {
            res.status(401).json({
                message: "You are not authorized to perform this task"
            });
            return
        }

        if (isAdmin(req)) {
            const productData = req.body;
            
            if (req.file) {
                productData.image = req.file.path;
            }

            if (productData.categories) {

            if (Array.isArray(productData.categories)) {
                // already array, ok
            } else if (typeof productData.categories === "string") {
                productData.categories = [productData.categories];
            } else {
                return res.status(400).json({ message: "Invalid categories format" });
            }
            } else {
            return res.status(400).json({ message: "categories field is required" });
            }

            const product = new Product(productData);
            await product.save();
            res.json({
                message: "Product add success"
            });
            return;
        }
    } catch (e) {
        res.status(500).json({
            message: "Product couldn't add" + e.message
        });
    }
}


export async function getProducts(req, res) {
    try {
        if (isUserNull(req) || !isAdmin(req)) {
            const products = await Product.find({
                availability: true
            });
            res.json(products);
            return;
        }


        if (isAdmin(req)) {
            const products = await Product.find();
            res.json(products);
            return;
        }


    } catch (e) {
        res.status(500).json({
            message: "Product couldn't fetch" + e.message
        });
    }
}


export async function deleteProduct(req, res) {
    try {
        if (isUserNull(req) || !isAdmin(req)) {
            res.status(401).json({
                message: "You are not authorized to perform this task"
            })

            return;
        }

        if (isAdmin(req)) {
            const deleteId = req.params.productKey;
            await Product.deleteOne({
                productKey: deleteId
            });
            res.json({
                message: "Product delete success"
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Product delete failed"
        });
    }

}


export async function updateProduct(req, res) {
    try {
        if (isUserNull(req) || !isAdmin(req)) {
            res.status(401).json({
                message: "You are not authorized to perform this task"
            });
            return
        }

        if (isAdmin(req)) {
            const updateData = req.body;
            const updateId = req.params.productKey;
            
            if (req.file) {
                updateData.image = req.file.path;
            }

            if (updateData.categories) {
                if (Array.isArray(updateData.categories)) {
                    // ok
                } else if (typeof updateData.categories === "string") {
                    updateData.categories = [updateData.categories];
                } else {
                    return res.status(400).json({
                    message: "Invalid categories format",
                    });
                }
            }

            await Product.updateOne({
                productKey: updateId
            },
                updateData
            );
            res.json({
                message: "Product update success"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "Product update failed"
        })
    }
}


export async function updateProductStock(req, res) {
    try {
        if (isUserNull(req)) {
            res.status(401).json({
                message: "You are not authorized to perform this task"
            });
            return
        }

        if (isAdmin(req) || isUser(req)) {
            const { productKey, stock } = req.body;
            let availability = true;
            if(stock == 0){
                availability = false;
            }
            await Product.updateOne(
                { productKey: productKey },
                { stock: stock, availability: availability }
            );
            res.json({
                message: "Product stock updated successfully"
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Product stock update failed"
        })
    }
}


export async function updateStockByCancellOrder(req,res) {
    try {
        if(isUserNull(req)) {
            res.status(401).json({
                message: "You are not authorized to perform this task"
            });
            return;
        }

        const {productKey, quantity} = req.body;
        const product = await Product.findOne({
            productKey: productKey
        });

        if(product == null){
            res.status(404).json({
                message: "Product not found"
            });
            return;
        }
        const newStock = product.stock + quantity;
        let availability = true;
        if(newStock == 0){
            availability = false;
        }
        await Product.updateOne(
            { productKey: productKey },
            { stock: newStock, availability: availability }
        );

        res.json({
            message: "Product stock updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Product stock update failed: " + error.message
        });
    }


}
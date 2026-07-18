import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/product.js";
import Category from "./model/category.js";

dotenv.config();

const dummyCategories = [
    { name: "Electronics" },
    { name: "Clothing" },
    { name: "Home & Garden" },
    { name: "Sports" },
    { name: "Books" }
];

const dummyProducts = [
    {
        productKey: "PROD001",
        name: "Wireless Headphones",
        description: "High quality wireless noise-canceling headphones.",
        price: 99.99,
        categories: ["Electronics"],
        productType: "physical",
        stock: 50,
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        availability: true
    },
    {
        productKey: "PROD002",
        name: "Cotton T-Shirt",
        description: "Comfortable 100% cotton t-shirt in various sizes.",
        price: 19.99,
        categories: ["Clothing"],
        productType: "physical",
        stock: 200,
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        availability: true
    },
    {
        productKey: "PROD003",
        name: "Smart Watch",
        description: "Feature-packed smartwatch with health tracking.",
        price: 199.99,
        categories: ["Electronics", "Sports"],
        productType: "physical",
        stock: 30,
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        availability: true
    },
    {
        productKey: "PROD004",
        name: "Coffee Maker",
        description: "Programmable coffee maker with thermal carafe.",
        price: 89.99,
        categories: ["Home & Garden"],
        productType: "physical",
        stock: 15,
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        availability: true
    },
    {
        productKey: "PROD005",
        name: "Yoga Mat",
        description: "Non-slip yoga mat with carrying strap.",
        price: 29.99,
        categories: ["Sports"],
        productType: "physical",
        stock: 100,
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        availability: true
    }
];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for seeding...");

        // Insert categories avoiding duplicates
        for (const cat of dummyCategories) {
            await Category.updateOne(
                { name: cat.name },
                { $set: cat },
                { upsert: true }
            );
        }
        console.log("Inserted dummy categories.");

        // Insert products avoiding duplicates
        for (const prod of dummyProducts) {
            await Product.updateOne(
                { productKey: prod.productKey },
                { $set: prod },
                { upsert: true }
            );
        }
        console.log("Inserted dummy products.");

        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDB();

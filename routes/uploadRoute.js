import express from "express";
import { uploadImage } from "../controller/uploadController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import upload from "../utils/cloudinaryConfig.js";

const uploadRouter = express.Router();

// 'image' is the field name that the frontend will use
uploadRouter.post("/uploadImage", authenticateToken, upload.single("image"), uploadImage);

export default uploadRouter;

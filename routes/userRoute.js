import express from "express"
import { deleteUser, getAllUsers, getUserDetails, loginUser, registerUser, updateUser } from "../controller/userController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

const userRouter = express.Router();


userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/getUserDetails",authenticateToken, getUserDetails);
userRouter.put("/updateUser",authenticateToken, updateUser);
userRouter.get("/getAllUsers",authenticateToken, getAllUsers);
userRouter.delete("/deleteUser/:email",authenticateToken, deleteUser);

export default userRouter;
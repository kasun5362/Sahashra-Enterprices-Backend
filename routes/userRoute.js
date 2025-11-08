import express from "express"
import { deleteUser, getAllUsers, getUserDetails, loginUser, registerUser, updateUser } from "../controller/userController.js";

const userRouter = express.Router();


userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/getUserDetails",getUserDetails);
userRouter.put("/updateUser",updateUser);
userRouter.get("/getAllUsers",getAllUsers);
userRouter.delete("/deleteUser/:email",deleteUser);

export default userRouter;
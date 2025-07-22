import express from "express"
import { AdminLogin, loginUser, registerUser } from "../Controller/userController.js";

const userRouter=express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/adminlogin", AdminLogin);


export default userRouter;
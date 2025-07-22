import express from "express"
import { addToCart, getUserCart, updateCart } from "../Controller/CartController.js";

const cartRouter=express.Router();

cartRouter.post("/add",addToCart);
cartRouter.get("/get",getUserCart);
cartRouter.post("/update",updateCart);


export default cartRouter;
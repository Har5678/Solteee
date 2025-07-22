import express from  "express";
import { addProduct,listProducts,removeProduct,getProduct,updateColors, addShoes, listShoes, updateShoesSizes } from "../Controller/productController.js";
import {upload} from "../Middleware/Multer.js";
import { adminAuth } from "../Middleware/AdminAuth.js";


const productRouter = express.Router();

productRouter.post("/add",adminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct);
productRouter.post("/add-shoes",adminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addShoes);
productRouter.get("/all-shoes",listShoes);
productRouter.post("/updateShoesSizes",adminAuth,updateShoesSizes);
productRouter.get("/all",listProducts);
productRouter.post("/remove",removeProduct);
productRouter.post("/get",adminAuth,getProduct);
productRouter.post("/update-colors",updateColors);


export default productRouter;
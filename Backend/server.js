import express from "express"
import cors from "cors"
import connectDB from "./Config/MongoDB.js";
import "dotenv/config"
import userRouter from "./Routes/userRoutes.js";
import connectCloudinary from "./Config/cloudinary.js";
import productRouter from "./Routes/productRoute.js";
import cartRouter from "./Routes/CartRoute.js";
import orderRouter from "./Routes/orderRoute.js";


const app=express();
const port= 4005;

app.use(cors());
connectDB();
app.use(express.json());
connectCloudinary();

app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);



app.get("/", (req, res) => {
        res.send("Hello World");
    
    });
    
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });


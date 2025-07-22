import { v2 as cloudinary } from 'cloudinary';
import productModel from '../Models/productModels.js';
import shoesModel from '../Models/shoesModel.js';

export const addProduct = async (req, res) => {
    try {
        console.log("hello");
        console.log(req.body);

        const { name, description, price, subCategory, category, colors, bestSeller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item != undefined);
        console.log(images);


        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price,
            image: imagesUrl,
            category,
            subCategory,
            colors,
            date: Date.now(),
            bestseller: bestSeller === "true" ? true : false
        }
        const product = new productModel(productData);
        await product.save();
        return res.json({ success: "true", message: "Product added successfully" });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }

}

export const addShoes = async (req, res) => {
    try {
        console.log(req.body);

        const { name, description, price, subCategory, category, sizes, bestSeller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item != undefined);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price,
            image: imagesUrl,
            category,
            subCategory,
            sizes,
            date: Date.now(),
            bestseller: bestSeller === "true" ? true : false

        }
        const product = new shoesModel(productData);
        await product.save();
        return res.json({ success: "true", message: "Product added successfully" });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}

export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.json({ success: "true", products });
    } catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}

export const listShoes = async (req, res) => {
    try {
        const shoes = await shoesModel.find({});
        return res.json({ success: "true", shoes });
    } catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}

export const removeProduct = async (req, res) => {

    try {
        const { id } = req.body;
        console.log(id);
        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: error.message })
    }

}

export const getProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        return res.json({ success: "true", product });
    } catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}

//update colors
export const updateColors = async (req, res) => {
    try {
        const { id, colors } = req.body;
        await productModel.findByIdAndUpdate(id, { colors });
        return res.json({ success: "true", message: "Colors updated successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}

export const updateShoesSizes= async (req,res)=>{
    try {
        const { id, sizes } = req.body;
        await shoesModel.findByIdAndUpdate(id, { sizes });
        return res.json({ success: "true", message: "Sizes updated successfully" });
    } catch (error) {
          console.log(error);
        return res.json({ success: "false", message: error.message })
    }
}


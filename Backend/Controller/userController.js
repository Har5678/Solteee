import userModel from "../Models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//create token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);  
}
// route for user registration 

export const registerUser = async (req, res) => {
    try {
        const {name,email,password}=req.body;
        console.log(name);
        console.log(email);
        console.log(password);
        // checking user already exists or not 
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //validating email and strong password 
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //creating new user
        const newUser= new userModel({name,email,password:hashedPassword});
        const user=await newUser.save();
        console.log(user);
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//route for user login

export const loginUser = async (req, res) => {
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Incorrect password"})
        }
        const token = createToken(user._id);
        return res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//route for admin login 

export const AdminLogin = async (req,res)=>{
    try {
        
        const {email,password} = req.body;
        
        if(email === process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            console.log(token);
            res.json({success:true,token})
            
        }else{
            res.json({success:false,message:"Invalid admin credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register a new user
export const registerUser = async(req,res) => {
    const {name, email, password} = req.body

    const imageFile = req.file;

    if(!name || !email || !password || !imageFile){
        return res.json({success: false ,message: "Missing details"});
    }

    try{    
        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.json({success:false, message:"User already registered"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        const user = await userModel.create({
            name,
            email,
            password:hashPassword,
            image:imageUpload.secure_url
        });

        res.json({
            success: true,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                image:user.image
            },
            token: generateToken(user._id)
        })

    }catch(error){
        res.json({success:false,message:error.message});
    }
}

//user login
export const loginUser = async(req,res) => {
    const {email,password} = req.body;

    try{
        const user = await userModel.findOne({email});

        if(await bcrypt.compare(password,user.password)){
            res.json({
                success:true,
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    image:user.image
                },
                token: generateToken(user._id)
            })
        }else{
            res.json({success:false, message:"Invalid email or password"})
        }
    }catch(error) {
        res.json({success:false,message:error.message})
    }
}



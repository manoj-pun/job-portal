import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

//Register a new user
export const registerUser = async(req,res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.json({success: false ,message: "Missing details"});
    }

    try{    
        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.json({success:false, message:"User already registered"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const user = await userModel.create({
            name,
            email,
            password:hashPassword,
        });

        res.json({
            success: true,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
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
        const user = await userModel.findOne({email})
        // console.log(user)
        if(!user){
            return res.json({success:false, message:"User not registered.Please sign up."});
        }

        if(bcrypt.compare(password,user.password)){
            res.json({
                success:true,
                company:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                },
                token: generateToken(user._id)
            })
        }else{
            res.json({success:false,message:"Invalid email or password"})
        }
    }catch(error){
        res.json({success:false,message:error.message})
    }
}



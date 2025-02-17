import jwt from "jsonwebtoken"
import companyModel from "../models/companyModel.js"
import userModel from "../models/userModel.js";


export const protectCompany = async(req,res,next) => {

    const token = req.headers.token

    if(!token){
        return res.json({success:false,message:"Not authorized.Login again"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded)

        req.company = await companyModel.findById(decoded.id).select("-password")
        // console.log(req.company)

        next()
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

export const protectUser = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.json({ success: false, message: "Not authorized.Login again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id).select("-password"); // Exclude password
        next();
    } catch (error) {
        res.json({ success: false, message: "Invalid token" });
    }
};

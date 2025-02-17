
import companyModel from "../models/companyModel.js";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary"
import generateToken from "../utils/generateToken.js";
import jobModel from "../models/jobModel.js";

//registe a company
export const registerCompany = async(req,res) => {
    const {name,email,password} = req.body

    const imageFile = req.file;

    if(!name||!email||!password||!imageFile){
        return res.json({success:true,message:"Missing Details"})
    }

    try {
        const companyExists = await companyModel.findOne({email})

        if(companyExists){
            return res.json({success:false,message:"Company already registered"})
        }

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password,salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await companyModel.create({
            name,
            email,
            password:hashPassword,
            image:imageUpload.secure_url
        })

        res.json({
            success:true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token:generateToken(company.name)
        })

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//login company
export const loginCompany = async(req,res) => {
    const {email,password} = req.body

    try{
        const company = await companyModel.findOne({email})

        if(!company){
            return res.json({success:false, message:"Company not registered.Please sign up."});
        }

        if(bcrypt.compare(password,company.password)){
            res.json({
                success:true,
                company:{
                    _id:company._id,
                    name:company.name,
                    email:company.email,
                    image:company.image
                },
                token: generateToken(company._id)
            })
        }else{
            res.json({success:false,message:"Invalid email or password"})
        }
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

//get company data
export const getCompanyData = async(req,res) => {

}

//post a new job
export const postJob = async(req,res) => {
    const {title,description,location,salary,level,category} = req.body

    const companyId = req.company._id
    // console.log(companyId, {title,description,location,salary})

    try {
        const newJob = new jobModel({
            title,
            description,
            location,
            salary,
            companyId,
            date:Date.now(),
            level,
            category
        })
        await newJob.save()

        res.json({success:true,newJob})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//get company job applicants
export const getCompanyJobApplicants = async(req,res) => {

}

//get company posted jobs
export const getCompanyPostedJobs = async(req,res) => {

}

//change job application status
export const changeJobApplicationStatus = async(req,res) => {

}

//change job visibility
export const changeVisibility = async(req,res) => {
    
}
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // _id:{
    //     type:String,
    //     required:true
    // },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    resume:{
        type:String
    }
})

const userModel = mongoose.model("User",userSchema)

export default userModel;
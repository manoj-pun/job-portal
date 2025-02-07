import {v2 as cloudinary} from "cloudinary"

const connectCloudinary = async() => {
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,//the configuration parameters(cloud_name,api_key,api_secret has to be as it is set by the cloudinay means you cannot change cloud_name to NAME_OF_THE_CLOUD)
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
}

export default connectCloudinary
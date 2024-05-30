import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({ 
  cloud_name: process.env.CLOUDNARY_CLOUDE_NAME, 
  api_key: process.env.CLOUDNARY_API_KEY , 
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

const CloudnaryStep=async(localFilePath)=>{
    try {
        if(!localFilePath) {
            console.log("local path not found of file", localFilePath)
            return null;
        }


        const response =await  cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        // console.log("file upload successfully on cloudnary", response.url);
        fs.unlinkSync(localFilePath);
        return response;
        
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
        
    }
}
export {CloudnaryStep}

  
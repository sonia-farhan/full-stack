import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
  cloud_name: "dh9qqmlzr", 
  api_key: "792775545195732", 
  api_secret: "FNzhE_L4gAG73F4HXub_jyEKzFY",
});

export const CloudnaryStep = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                console.error("Error uploading file to Cloudinary:", error.message);
                return reject(error);
            }
            resolve(result);
        });

        stream.end(fileBuffer);
    });
};

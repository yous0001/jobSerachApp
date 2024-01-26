import {v2 as cloudinary} from 'cloudinary';

const cloudinaryConnection=()=>{


    cloudinary.config({ 
    cloud_name: 'dfdmgqhwa', 
    api_key: '729457956289412', 
    api_secret: 'Ctg-Y5u_yjD5aKnxZihV1XSS86c' 
    });
    return cloudinary
};

export default cloudinaryConnection;

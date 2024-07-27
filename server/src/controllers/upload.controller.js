import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const uploadResume = asyncHandler(async (req, res) => {
    const response = await uploadOnCloudinary(req.file.path)
    
    if (!response){
        return res.status(500).json({message: "Error uploading file to cloudinary"})
    }

    return res.status(200).json({message: "File uploaded successfully", url: response.url})
    
})

export { uploadResume }
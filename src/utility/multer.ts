import dotenv from 'dotenv';
dotenv.config();
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const vendorAddFood = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "Online-Food-Delivery",
    };
  },
});





const vendorCoverImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "Online-Food-Delivery",
    };
  },
});


export const addFoodImage = multer({ storage: vendorAddFood });
export const vendorCoverImageUpload = multer({ storage: vendorCoverImage });

// lib/deleteFile.js
import { v2 as cloudinary } from 'cloudinary';

// Ensure Cloudinary is configured (optional if already done globally)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
    throw new Error("Delete failed");
  }
};

export default deleteFile;

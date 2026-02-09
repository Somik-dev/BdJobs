import { v2 as cloudinary } from 'cloudinary';

// Proper environment variable keys (should be all caps)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // ensures HTTPS
});

const uploadFile = async (file) => {
  try {
    if (!file) throw new Error("No file provided");

    // Corrected from Buffer.form to Buffer.from
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadedFileData = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "jobPortal",
          access_mode: "public",
          resource_type: "auto", // handles image/video/pdf/etc.
        },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );

      stream.end(buffer);
    });

    return uploadedFileData;
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);
    throw new Error("Upload failed");
  }
};

export default uploadFile;

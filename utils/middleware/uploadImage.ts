import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "./helpers";

let configured = false;

function ensureCloudinaryConfigured() {
  if (configured) return;
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error("Cloudinary environment variables are not defined");
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  configured = true;
}

export async function uploadImageBuffer(fileBuffer: Buffer): Promise<string> {
  ensureCloudinaryConfigured();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "kebabscrib-products" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);

          reject(error);
        } else {
          resolve(result?.secure_url as string);
        }
      },
    );

    stream.end(fileBuffer);
  });
}

export async function deleteImage(imageUrl: string): Promise<void> {
  ensureCloudinaryConfigured();
  const publicID = extractPublicId(imageUrl);
  if (!publicID) throw new Error("Invalid Cloudinary Image URL");
  await cloudinary.uploader.destroy(publicID);
}

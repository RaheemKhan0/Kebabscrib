// getCloudinaryAssets.ts
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import "dotenv/config";

// Configure your credentials
console.log('cloud name : ' , process.env.CLOUDINARY_CLOUD_NAME)
console.log('api key : ', process.env.CLOUDINARY_API_KEY)
console.log('api secret : ' , process.env.API_SECRET);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDRINARY_API_SECRET,
});

async function getAllImageUrls() {
  const results = [];
  let nextCursor;

  do {
    const response = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      max_results: 100,
      next_cursor: nextCursor,
    });

    results.push(...response.resources.map((r : any) => r.secure_url));
    nextCursor = response.next_cursor;
  } while (nextCursor);

  // Write to file
  fs.writeFileSync('utils/seed/cloudinary-image-urls.json', JSON.stringify(results, null, 2));
  console.log('All image URLs saved to cloudinary-image-urls.json');
}

getAllImageUrls();


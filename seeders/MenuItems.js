import "dotenv/config"; // Automatically loads .env.local
import fs from "fs";
import path from "path";
import connectMongodb from "../lib/mongodb.js";
import MenuItem from "../model/menu_items.js"; 

import { fileURLToPath } from "url"; // ES Modules __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedMenuItems = async () => {
  try{
    await connectMongodb();
    console.log("MongoDB Connection Established") 

    // Load JSON data 
    const filePath = path.join(__dirname, "../model/restaurant_items.json")
    // Reads the restaurant_items.json file synchronously as UTF-8 encoded text.
    const menuItemsJson = fs.readFileSync(filePath, "utf-8");
    //Parses the raw text from the file into a JavaScript array of objects.
    const menuItems = JSON.parse(menuItemsJson);
    
    await MenuItem.insertMany(menuItems);
    console.log("Menu Items have been seeded sucessfully")
  } 
  catch (error) {
    console.error("Seeding Failed:", error);
  } 
  finally {
    process.exit(); 
  }
}

seedMenuItems();
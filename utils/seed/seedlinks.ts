import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";


const filename = fileURLToPath(import.meta.url);
const dir = path.dirname(filename);


try {
  const productJson = readFileSync(path.join(dir)) 
  console.log(productJson);
} catch (error) {
 console.log(error) 
}

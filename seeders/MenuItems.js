import connectMongodb from "../lib/mongodb";
import Menu_items from "../model/menu_items"; 

const seedMenuItems = async () => {
  try{
    await connectMongodb();

  }
}

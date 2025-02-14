import { NextResponse, NextRequest } from "next/server";
import MenuItem from "../../../model/menu_items";
import connectMongodb from "../../../lib/mongodb";

export async function GET(req: NextRequest) {
  await connectMongodb();
  console.log("🔥 MongoDB Connection Established");

  const count = await MenuItem.countDocuments();
  console.log("📌 Total menu items in DB:", count);

  const testItem = await MenuItem.findOne();
  console.log("🛠️ Sample Item: ", testItem);

  try {
    const menuItems = await MenuItem.find({});

    console.log("✅ Items Fetched - RABIE");
    console.table(menuItems);

    return NextResponse.json(menuItems, { status: 200 });
  } catch (error: any) {
    console.error("❌ Item Fetch Failed - RABIE", error.message);

    return NextResponse.json(
      { message: "Failed to fetch menu items", error: error.message },
      { status: 500 },
    );
  }
}

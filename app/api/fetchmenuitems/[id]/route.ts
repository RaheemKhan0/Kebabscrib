import { NextRequest, NextResponse } from "next/server";
import MenuItem from "../../../../model/menu_items";
import connectMongodb from "../../../../lib/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log("Fetching menu item with slug:", params.id);
  const slugparts = await params.id.split("-"); // ✅ Directly extract `id` (no need for `await`)
  console.log("Slug Parts:", slugparts);
  const item_id = slugparts[slugparts.length -1];
  console.log("Fetching menu item with ID:", item_id);

  try {
    await connectMongodb();

    // ✅ Validate if `item_id` is a valid MongoDB ObjectId (24 characters)
    if (!item_id || item_id.length !== 24) {
      return NextResponse.json(
        { error: "Invalid item ID format" },
        { status: 400 },
      );
    }

    // ✅ Fetch menu item from MongoDB
    const menu_item = await MenuItem.findById(item_id).lean() // `.lean()` makes response serialization faster

    if (!menu_item) {
      return NextResponse.json(
        { error: "Menu Item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ menu_item }, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu item:", error); // ✅ Better error logging
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

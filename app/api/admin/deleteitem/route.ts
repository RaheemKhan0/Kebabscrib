import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { _id } = reqBody;
    if (!_id) {
      return NextResponse.json({
        error: "No item provided",
        status: 400,
      });
    }
    await connectMongodb();
    const deletedItem = await MenuItem.findOneAndDelete({ _id: _id });
    if (deletedItem.acknowledged && deletedItem.deletedCount == 1) {
      return NextResponse.json({
        deletedItem : deletedItem,
        status: 200,
      });
    } else {
      return NextResponse.json({
        error: "Item not found",
        status: 400,
      });
    }
  } catch (error){
    return NextResponse.json({
      error : error,
      status : 500
    }) 
  }
}

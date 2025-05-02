import { NextRequest, NextResponse } from "next/server";
import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";

export async function PATCH(req: NextRequest) {
  try {
    const { _id, isHidden } = await req.json();

    if (!_id && isHidden !== "boolean") {
      return NextResponse.json({
        error: "Invalid request data",
        status: 400,
      });
    }

    await connectMongodb();

    const updatedItem = await MenuItem.findOneAndUpdate(
      _id,
      { isHidden: isHidden },
      { new: true },
    );
    if (!updatedItem) {
      return NextResponse.json({
        error: "Item not Found",
        status: 404,
      });
    }

    return NextResponse.json({
      updatedItem: updatedItem,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}

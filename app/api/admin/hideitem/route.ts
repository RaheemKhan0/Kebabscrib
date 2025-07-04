import { NextRequest, NextResponse } from "next/server";
import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";

export async function PATCH(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;
    console.log("id : ", id);
    if (!id) {
      console.log("The id is undefined");
      return NextResponse.json({ error: "id is undefined" }, { status: 400 });
    }
    console.log("connecting to mongodb");

    await connectMongodb();
    console.log("updating item");
    const updatedItem = await MenuItem.findOneAndUpdate(
      { _id : id },
      [
        {
          $set: {
            isHidden: { $not: "$isHidden" }, // toggle the value
          },
        },
      ],
      { new: true },
    );
    console.log("Updated isHidden value:", updatedItem.isHidden);

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

import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";
import { deleteImage } from "@utils/middleware/uploadImage";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const payload = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (payload?.role != "admin") {
      return NextResponse.json({ error: "Not authorised" }, { status: 401 });
    }

    const reqBody = await req.json();
    const { id } = reqBody;
    console.log("id : ", id);
    if (!id) {
      return NextResponse.json({
        error: "No item provided",
        status: 400,
      });
    }
    await connectMongodb();
    const deletedItem = await MenuItem.findOne({ _id: id });
    deleteImage(deletedItem.item_img_url);
    const item = await MenuItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Delete image from Cloudinary
    await deleteImage(item.item_img_url);

    // Delete from DB
    const deletionResult = await MenuItem.deleteOne({ _id: id });

    if (deletionResult.deletedCount === 1) {
      return NextResponse.json({ deletedItem: item }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Delete failed" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}

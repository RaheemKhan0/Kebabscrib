import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";
import { uploadImageBuffer } from "@utils/middleware/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  try {
    await connectMongodb();
    const formData = await req.formData(); // Important: because images come in multipart/form-data

    const file = formData.get("file") as File;
    const itemName = formData.get("itemName") as string;
    const itemDescription = formData.get("itemDescription") as string;
    const itemPrice = formData.get("itemPrice") as string;
    const itemCategory = formData.get("itemCategory") as string;
    const isHidden = formData.get("isHidden") === "true";

    if (!file) {
      return NextResponse.json({
        error: "No Image uploaded",
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageUrl = await uploadImageBuffer(buffer);

    const newItem = await MenuItem.create({
      item_name: itemName,
      item_description: itemDescription,
      item_price: {
        single: parseFloat(itemPrice),
      },
      item_category: itemCategory,
      item_img_url: imageUrl,
      isAvailable: true,
      isHidden,
    });

    return NextResponse.json({ newItem, status: 201 });
  } catch (error) { }
}

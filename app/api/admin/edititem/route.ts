import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { deleteImage, uploadImageBuffer } from "@utils/middleware/uploadImage";

export async function PATCH(req: NextRequest) {
  try {
    const payload = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (payload?.role !== "admin") {
      return NextResponse.json({ error: "Not Authorised!" }, { status: 401 });
    }

    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    const itemName = formData.get("item_name") as string;
    const itemDescription = formData.get("item_description") as string;
    const item_Price_single = formData.get("item_price_single") as string;
    const item_Price_combo = formData.get("item_price_combo") as string;
    const itemCategory = formData.get("item_category") as string;
    const id = formData.get("id") as string;

    await connectMongodb();

    const oldItem = await MenuItem.findById(id);
    if (!oldItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    let imageUrl = oldItem.item_img_url;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      deleteImage(imageUrl);
      imageUrl = await uploadImageBuffer(buffer);
    }

    const updated = await MenuItem.findByIdAndUpdate(
      id,
      {
        item_name: itemName,
        item_description: itemDescription,
        item_price: {
          single: parseFloat(item_Price_single),
          combo: item_Price_combo ? parseFloat(item_Price_combo) : undefined,
        },
        item_category: itemCategory,
        item_img_url: imageUrl,
      },
      { new: true }
    );

    return NextResponse.json({ updated }, { status: 200 });
  } catch (error) {
    console.error("Edit item error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}


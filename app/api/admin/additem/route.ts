import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";
import { generateSlug } from "@utils/middleware/helpers";
import { uploadImageBuffer } from "@utils/middleware/uploadImage";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const payload = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (payload?.role !== "admin") {
      return NextResponse.json(
        {
          error: "Not Authorised!",
        },
        {
          status: 401,
        },
      );
    }
    await connectMongodb();
    const formData = await req.formData(); // Important: because images come in multipart/form-data

    const file = formData.get("image") as File;
    const itemName = formData.get("item_name") as string;
    const itemDescription = formData.get("item_description") as string;
    const item_Price_single = formData.get("item_price_single") as string;
    const item_Price_combo = formData.get("item_price_combo") as string;
    const itemCategory = formData.get("item_category") as string;
    console.log("form Data : ", formData);

    if (!file) {
      return NextResponse.json(
        { error: "No Image uploaded" },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();
    console.log("converting file to bytes");
    const buffer = Buffer.from(bytes);
    console.log("converting to buffer");

    const imageUrl = await uploadImageBuffer(buffer);
    console.log("uploaded image");
    console.log("imageUrl : ", imageUrl);
    const slug = generateSlug(itemName);
    const newItem = await MenuItem.create({
      item_name: itemName,
      item_description: itemDescription,
      item_price: {
        single: parseFloat(item_Price_single),
        ...(item_Price_combo && {
          meal: parseFloat(item_Price_combo),
        }),
      },
      item_category: itemCategory,
      item_img_url: imageUrl,
      slug: slug,
      isHidden: true,
    });
    console.log("created new item");

    return NextResponse.json({ newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

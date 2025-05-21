import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;
    console.log("id : " , id);
    await connectMongodb();
    const item = await MenuItem.findById(id);
    
    if (!item) {
      return NextResponse.json(
        {
          error : "item not found"
        },
        {
          status : 404
        }
      )
    }
    
    return NextResponse.json(
      {
        item : item
      },
      {
        status : 200
      }
    )

  } catch (error) {
    return NextResponse.json(
      {
        error : error
      },
      {
        status : 500
      }
    )
  }
}

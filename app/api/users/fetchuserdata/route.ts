import { NextRequest, NextResponse } from "next/server";
import verifytoken from "../../../../utils/middleware/verifytoken";
import connectUserDataBase from "../../../../lib/connectUserDataBase";
import KebabscribUser from "../../../../model/Kebabscrib_User";

export async function GET(req: NextRequest) {
  try {
    const result = await verifytoken(req); // Assuming verifytoken resolves with decoded token
    if (!result.decoded.id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }
    await connectUserDataBase();
    const user = await KebabscribUser.findById(result.decoded.id); // Ensure `result.decoded._id` exists
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

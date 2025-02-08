import { NextRequest, NextResponse } from "next/server";
import { verifytoken } from "../../../../utils/middleware/verifytoken";
import connectUserDataBase from "../../../../lib/connectUserDataBase";
import KebabscribUser from "../../../../model/Kebabscrib_User";

export async function GET(req: NextRequest) {
  try {
    const result = await verifytoken(req);

    if (!result.ok) {
      return result;
    }

    const data = await result.json(); // Await the JSON response
    const { decoded, error } = data;
   console.log("decoded : ", decoded) 

    if (!decoded || !decoded.email) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    await connectUserDataBase();
    const protected_user = await KebabscribUser.findOne({
      email: decoded.email,
    });

    if (!protected_user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const { password, ...user } = protected_user.toObject();

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

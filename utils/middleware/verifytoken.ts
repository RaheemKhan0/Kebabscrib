import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { refreshtoken } from "./refreshtoken";

export async function verifytoken(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.error("No token found, user is not logged in.");
    return NextResponse.json(
      { error: "Access Denied, No Token Provided" },
      { status: 401 },
    );
  }

  try {
    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    return NextResponse.json({ decoded }, { status: 200 });
  } catch (err: any) {
    console.error("Token verification failed:", err.message);

    const newrefreshtoken = await refreshtoken(req);
    console.log("Refreshing Token");
    console.log("refresh token : ", newrefreshtoken);
    if (newrefreshtoken.status == 200) {
      const newAccesstoken = newrefreshtoken?.token;
      const decoded = jwt.verify(
        newAccesstoken,
        process.env.TOKEN_SECRET as string,
      );
      return NextResponse.json({ decoded }, { status: 200 });
    }

    // 🛑 CASE 4: Invalid Token / Malformed Token
    return NextResponse.json(
      { error: "Invalid token, please log in again" },
      { status: 401 },
    );
  }
}

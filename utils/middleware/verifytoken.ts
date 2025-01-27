import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import "dotenv/config"; // Load environment variables from .env.local file
import { JwtPayload } from "jsonwebtoken";

type VerifyTokenResult =
  | { decoded: JwtPayload & { _id: string } } // For valid tokens
  | NextResponse; // For invalid tokens

export default async function verifytoken(req: NextRequest): Promise<VerifyTokenResult> {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Access Denied, No Token Provided" },
      { status: 401 },
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return { decoded };
    // Token is valid
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      console.error("Token has expired:", err.message);
      return NextResponse.json({ error: "Token has expired" }, { status: 401 });
    } else if (err.name === "JsonWebTokenError") {
      console.error("Invalid token:", err.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    } else if (err.name === "NotBeforeError") {
      console.error("Token not active yet:", err.message);
      return NextResponse.json(
        { error: "Token not active yet" },
        { status: 401 },
      );
    } else {
      console.error("Unknown error:", err.message);
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }
  }
}

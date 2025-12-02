import { NextRequest, NextResponse } from "next/server";
import connectMongodb from "@lib/mongodb";
import ResetToken from "@model/reset_token";
export async function POST(req: NextRequest) {
  try {
    await connectMongodb(); // Ensure DB is connected

    const reqBody = await req.json();
    const { token } = reqBody;
    if (!token) {
      return NextResponse.json({ message: "Token missing" }, { status: 400 });
    }

    const record = await ResetToken.findOne({ token });

    if (!record || record.expiresAt < new Date()) {
      return NextResponse.json({ valid: false }, { status: 404 });
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (err) {
    console.error("Error verifying token:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import KebabscribUser from "@model/kebabscrib_user";
import connectMongodb from "@lib/mongodb";
import VerificationTokens from "@model/verification_token";

export async function POST(req: NextRequest) {
  try {
    await connectMongodb();

    const { verifytoken } = await req.json();

    if (!verifytoken) {
      return NextResponse.json({ error: "Token is missing" }, { status: 400 });
    }

    const tokenRecord = await VerificationTokens.findOne({
      token: verifytoken,
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired verification link" },
        { status: 400 },
      );
    }

    // Mark user as verified
    await KebabscribUser.updateOne(
      { _id: tokenRecord.userId },
      { $set: { verified: true } },
    );

    // Delete token after use
    await VerificationTokens.deleteOne({ token: verifytoken });

    return NextResponse.json({ message: "user verified" }, { status: 200 });
  } catch (error) {
    console.error("Verification failed:", error);
    return NextResponse.json(
      { error: "Something went wrong during verification" },
      { status: 500 },
    );
  }
}

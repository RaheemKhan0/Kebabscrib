import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectMongodb from "@lib/mongodb";
import KebabscribUser from "@model/Kebabscrib_User";
import ResetToken from "@model/ResetToken";
import { sendForgottenPasswordEmail } from "@lib/emails/sendEmail";

const RATE_LIMIT_MINUTES = 5;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    await connectMongodb();

    const user = await KebabscribUser.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 },
      );
    }

    const existingToken = await ResetToken.findOne({ userId: user._id });
    const now = new Date();

    if (existingToken && existingToken.lastSentAt) {
      const diff = now.getTime() - existingToken.lastSentAt.getTime();
      const limitMs = RATE_LIMIT_MINUTES * 60 * 1000;

      if (diff < limitMs) {
        const minutesLeft = Math.ceil((limitMs - diff) / 60000);
        return NextResponse.json(
          {
            error: `Please wait ${minutesLeft} minute(s) before trying again.`,
          },
          { status: 429 },
        );
      }

      // Allow resend but update lastSentAt
      existingToken.lastSentAt = now;
      await existingToken.save();

      const resetUrl = `${req.nextUrl.origin}/reset-password?token=${existingToken.token}`;
      await sendForgottenPasswordEmail(resetUrl);

      return NextResponse.json(
        { message: "Reset email re-sent" },
        { status: 200 },
      );
    }

    // No existing or expired token — create new one
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

    await ResetToken.create({
      userId: user._id,
      token,
      expiresAt: expires,
      lastSentAt: now,
    });

    const resetUrl = `${req.nextUrl.origin}/reset-password?token=${token}`;
    await sendForgottenPasswordEmail(resetUrl, email);

    return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
  } catch (err) {
    console.error("Password reset error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

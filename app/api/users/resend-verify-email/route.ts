import { authOptions } from "@/api/auth/[...nextauth]/option";
import connectMongodb from "@lib/mongodb";
import VerificationTokens from "@model/VerificationToken";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import KebabscribUser from "@model/Kebabscrib_User";
import { sendVerificationEmail } from "@lib/emails/sendEmail";
import crypto from "crypto";

const RATE_LIMIT_MINUTES = 5;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "No user session" }, { status: 401 });
  }

  await connectMongodb();

  const user = await KebabscribUser.findById(session.user._id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.verified) {
    return NextResponse.json({ message: "User already verified" }, { status: 200 });
  }

  const existingToken = await VerificationTokens.findOne({ userId: user._id });

  const now = new Date();
  if (existingToken && existingToken.lastSentAt) {
    const diff = now.getTime() - existingToken.lastSentAt.getTime();
    const limitMs = RATE_LIMIT_MINUTES * 60 * 1000;

    if (diff < limitMs) {
      const minutesLeft = Math.ceil((limitMs - diff) / 60000);
      return NextResponse.json(
        { error: `Please wait ${minutesLeft} minute(s) before resending the verification email.` },
        { status: 429 }
      );
    }

    // Token still valid but allowed to resend → just update lastSentAt
    existingToken.lastSentAt = now;
    await existingToken.save();

    const verificationLink = `${req.nextUrl.origin}/verifyemail?token=${existingToken.token}`;
    await sendVerificationEmail(session.user.user_name, verificationLink, user.email);

    return NextResponse.json({ message: "Verification email re-sent" }, { status: 200 });
  }

  // No token or expired → generate new one
  const token = crypto.randomBytes(32).toString("hex");

  await VerificationTokens.create({
    userId: user._id,
    token,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    lastSentAt: now,
  });

  const verificationLink = `${req.nextUrl.origin}/verify-email?token=${token}`;
  await sendVerificationEmail(user.email, verificationLink, session.user.email);

  return NextResponse.json({ message: "Verification email sent" }, { status: 200 });
}


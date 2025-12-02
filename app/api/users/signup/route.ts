import connectMongodb from "@lib/mongodb.js";
import KebabscribUser from "@model/kebabscrib_user";
import bcryptjs from "bcrypt";
import { NextResponse, NextRequest } from "next/server";
import { sendVerificationEmail } from "@lib/emails/sendEmail";
import VerificationTokens from "@model/verification_token";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    await connectMongodb();
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const existingUser = await KebabscribUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new KebabscribUser({
      user_name: username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await VerificationTokens.create({
      userId: savedUser._id,
      token,
      expiresAt,
      lastSentAt: expiresAt, 
    });

    const verificationLink = `${request.nextUrl.origin}/verify-email?token=${token}`;

    // Send verification email (optional)
    await sendVerificationEmail(username, verificationLink, email);

    const userResponse = {
      id: savedUser._id,
      user_name: savedUser.user_name,
      email: savedUser.email,
      verified: savedUser.verified,
    };

    return NextResponse.json(
      {
        message: "User created successfully. Please verify your email.",
        success: true,
        user: userResponse,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error during user creation:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}


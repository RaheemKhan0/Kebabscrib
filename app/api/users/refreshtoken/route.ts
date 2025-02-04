import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const refreshtoken = req.cookies.get("refreshtoken")?.value;
  if (!refreshtoken) {
    return NextResponse.json({
      error: "No refresh token found, Unauthorized access",
      status: 401,
    });
  }
  let verify;
  try {
    verify = jwt.verify(refreshtoken, process.env.TOKEN_SECRET);
  } catch (error) {
    return NextResponse.json({
      error: "Invalid refresh token",
      status: 401,
    });
  }
  console.log("verify : ", verify);
  const tokenData = {
    id: verify._id,
    email: verify.email,
    username: verify.user_name,
  };
  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: "12h",
  });
  const refreshToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });
  const response = NextResponse.json({
    message: "Token Refreshed",
    status: 200,
  });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 12 * 60 * 60, // 12 hours
  });

  response.cookies.set("refreshtoken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}

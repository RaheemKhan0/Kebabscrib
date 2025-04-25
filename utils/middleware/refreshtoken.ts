import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function refreshtoken(request: NextRequest) {
  const refreshtoken = request.cookies.get("refreshtoken")?.value;

  if (!refreshtoken) {
    return {
      error: "No refresh token found, please log in",
      status: 401,
    };
  }

  try {
    // ✅ Verify the refresh token
    const verify = jwt.verify(refreshtoken, process.env.TOKEN_SECRET as string);

    // ✅ Ensure correct payload
    const tokenData = {
      id: verify.id, // Changed from verify._id
      email: verify.email,
      username: verify.username,
      role: verify.role,
    };

    // ✅ Generate new tokens
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {
      expiresIn: "12h",
    });
    const newRefreshToken = jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    // ✅ Create response and set cookies
    const response = NextResponse.json({
      message: "Token Refreshed",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 12 * 60 * 60, // 12 hours
    });

    response.cookies.set("refreshtoken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return {
      token: token,
      newRefreshToken: newRefreshToken,
      status: 200,
    }; // ✅ Returning response correctly
  } catch (error: any) {
    // ✅ Handle Expired Token
    if (error.name === "TokenExpiredError") {
      return {
        error: "RefreshTokenExpired",
        status: 401,
      };
    }

    // ✅ Handle Invalid Token
    return {
      error: "Invalid token, please log in again",
      status: 401,
    };
  }
}

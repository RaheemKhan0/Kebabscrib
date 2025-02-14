import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";

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

    // 🛑 CASE 2: If token is expired, try refreshing
    if (err.name === "TokenExpiredError") {
      try {
        const refreshResponse = await axios.post(
          "/api/users/refreshtoken",
          {},
          { withCredentials: true }, // ✅ Ensures cookies are sent
        );

        // ✅ Extract new token from response
        const newToken = refreshResponse.data?.token;
        if (!newToken) {
          console.error(
            "Refresh token request successful, but no new token received.",
          );
          return NextResponse.json(
            { error: "New token not found, please log in again" },
            { status: 401 },
          );
        }

        // ✅ Verify the new token
        const decoded = jwt.verify(
          newToken,
          process.env.TOKEN_SECRET as string,
        );
        return NextResponse.json({ decoded }, { status: 200 });
      } catch (refreshError: any) {
        console.log(
          "Refresh Token has Expired or is Invalid:",
          refreshError.response?.data?.error || refreshError.message,
        );

        // 🛑 CASE 3: Refresh token also expired -> User must log in again
        return NextResponse.json(
          { error: "Session has Expired, Please Log In again" },
          { status: 401 },
        );
      }
    }

    // 🛑 CASE 4: Invalid Token / Malformed Token
    return NextResponse.json(
      { error: "Invalid token, please log in again" },
      { status: 401 },
    );
  }
}


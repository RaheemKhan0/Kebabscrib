import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import KebabscribUser from "../../../../model/Kebabscrib_User";
import connectMongodb from "../../../../lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    await connectMongodb();
    console.log("Logging in ...");

    const reqBody = await request.json();

    const { email, password, remember } = reqBody;

    const user = await KebabscribUser.findOne({ email });
    console.log("User : ", user);

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 },
      );
    }
    const validpassword = await bcryptjs.compare(password, user.password);
    if (!validpassword) {
      return NextResponse.json({ error: "Wrong Password" }, { status: 400 });
    }
    user.lastlogin = new Date();
    await user.save();
    const tokenData = {
      id: user._id,
      username: user.user_name,
      email: user.email,
    };

    // create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "12h",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    const refreshToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    response.cookies.set("refreshtoken", refreshToken, {
      httpOnly: true,
    });
    console.log("cookies set");

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }, // Ensure proper error handling with status code 500);
    );
  }
}

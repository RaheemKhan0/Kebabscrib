import connectUserDataBase from "../../../../lib/connectUserDataBase";
import { NextRequest, NextResponse } from "next/server";
import KebabscribUser from "../../../../model/Kebabscrib_User";
import { error } from "console";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// connect to the data base to check the users registered
connectUserDataBase();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, remember } = reqBody;

    const user = await KebabscribUser.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "User does not exist",
        status: 400,
      });
    }
    const validpassword = await bcryptjs.compare(password, user.password);
    if (!validpassword) {
      return NextResponse.json({
        error: "Wrong Password",
        status: 400,
      });
    }
    const tokenData = {
      id: user._id,
      username: user.user_name,
      email: user.email,
    };
    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "12h",
    });

    const response = NextResponse.json({
      message : "Login Successful",
      success : true
    })
    response.cookies.set("token", token, {
      httpOnly: true,
    })
    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}

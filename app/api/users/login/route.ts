import connectUserDataBase from "../../../../lib/connectUserDataBase";
import { NextRequest, NextResponse } from "next/server";
import KebabscribUser from "../../../../model/Kebabscrib_User";
import { error } from "console";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// connect to the data base to check the users registered

export async function POST(request: NextRequest) {
  try {
    await connectUserDataBase();
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
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}

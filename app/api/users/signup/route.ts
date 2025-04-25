import connectMongodb from "@lib/mongodb.js";
import KebabscribUser from "@model/Kebabscrib_User.js";
import bcryptjs from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    await connectMongodb();
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // [Fix 2: Check if the user already exists with `await`]
    const existingUser = await KebabscribUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // [Fix 3: Validate input fields]
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // [Fix 4: Generate salt and hash the password securely]
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // [Fix 5: Use the correct field name (`user_name`) in schema]
    const newUser = new KebabscribUser({
      user_name: username, // Updated to match the schema field
      email: email,
      password: hashedPassword,
    });

    // [Fix 6: Save the user and handle potential errors explicitly]
    const savedUser = await newUser.save();

    // [Fix 7: Exclude sensitive data like the password in the response]
    const userResponse = {
      id: savedUser._id,
      user_name: savedUser.user_name,
      email: savedUser.email,
      isVerified: savedUser.isVerified,
    };

    // [Fix 8: Explicitly set the status code to `201` for resource creation]
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: userResponse,
      },
      { status: 201 },
    );
  } catch (error: any) {
    // [Fix 9: Avoid exposing sensitive error details]
    console.error("Error during user creation:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

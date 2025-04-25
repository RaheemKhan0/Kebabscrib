import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const verifyUser = async (request: NextRequest) => {
  const accesstoken = request.cookies.get("token")?.value;

  if (!accesstoken) {
    return {
      error: "user not logged in",
      status: 401
    };
  }

  try {
    const decoded = jwt.verify(accesstoken, process.env.TOKEN_SECRET);

    return {
      message: "user verified",
      status: 200
    };
  } catch (error: any) {
    if (error.name == "TokenExpiredError") {
      return {
        error: "accesstoken expired",
        status: 401
      };
    }
    return {
      error: "accesstoken is invalid",
      status: 401
    };
  }
};


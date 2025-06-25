import ResetToken from "@model/ResetToken";
import { NextRequest, NextResponse } from "next/server";
import KebabscribUser from "@model/Kebabscrib_User";
import bcryptjs from "bcrypt";

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();
  console.log("token : ", token);
  console.log("new Password : ", newPassword);

  const tokenRecord = await ResetToken.findOne({ token });

  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return new Response("Invalid or expired token", { status: 400 });
  }
   const salt = await bcryptjs.genSalt(10);
  const encryptednewPassword = await bcryptjs.hash(newPassword, salt);
  const res = await KebabscribUser.updateOne(
    { _id: tokenRecord.userId },
    { $set: { password: encryptednewPassword } },
  );
  console.log("successfuly updated the password", res);

  await ResetToken.deleteOne({ token });

  return NextResponse.json(
    { message: "Password reset successful" },
    { status: 200 },
  );
}

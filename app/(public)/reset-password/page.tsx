import ResetPasswordPage from "@components/Auth/ResetPassword";
import { connection } from "next/server";

const page = async () => {
  await connection();
  return <ResetPasswordPage />;
};

export default page;


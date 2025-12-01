import SuccessPage from "@components/Checkout/SuccessPage";
import { connection } from "next/server";
const page = async () => {
  await connection();
  return <SuccessPage />;
};

export default page;

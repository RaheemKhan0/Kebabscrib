import CheckoutPage from "@components/Checkout/Checkout";
import { connection } from 'next/server'

const page = async () => {
  await connection();
  return <CheckoutPage />;
};

export default page;

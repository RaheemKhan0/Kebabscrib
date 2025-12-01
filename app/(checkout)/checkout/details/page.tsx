import CheckoutDetailsPage from "@components/Checkout/CheckoutDetails";
import { connection } from 'next/server'

const page = async () => {
  await connection();
  return <CheckoutDetailsPage />;
};

export default page;

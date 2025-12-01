import VerifyEmailPage from "@components/Auth/VerificationPage";
import { connection } from 'next/server'

const page = async () => {
  await connection()
  return <VerifyEmailPage />;
};

export default page;

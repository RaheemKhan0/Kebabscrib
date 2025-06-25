import { render } from "@react-email/render";
import resend from "@lib/resend";
import { OrderType } from "types/order";
import { OrderReceipt } from "@components/Emails/OrderRecieptEmail";
import ForgottenPasswordEmail from "@components/Emails/ForgottenPasswordEmail";
import VerificationEmail from "@components/Emails/VerificationEmail";

export async function sendOrderReceiptEmail(order: OrderType) {
  const html = await render(<OrderReceipt order={order} />);
  console.log("Sending Order Receipt to : ", order.email);

  const result = await resend.emails.send({
    from: "onboarding@resend.dev", // or your real domain
    to: "demo@resend.dev",
    subject: "Your Order Receipt - Kebabs Crib",
    html,
  });
  console.log("email result : ", result);
}

export async function sendForgottenPasswordEmail(resetUrl: string) {
  const html = await render(<ForgottenPasswordEmail resetUrl={resetUrl} />);
  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "demo@resend.dev",
    subject: "Forgotten Password Link - Kebabscrib",
    html,
  });
  console.log("forgotten email : ", result);
}
export async function sendVerificationEmail(
  username: string,
  verifyUrl: string,
) {
  const html = await render(
    <VerificationEmail username={username} verifyUrl={verifyUrl} />,
  );
  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "demo@resend.dev",
    subject: " Verify your Kebabscrib Account - Kebabscrib",
    html,
  });
  console.log("forgotten email : ", result);
}

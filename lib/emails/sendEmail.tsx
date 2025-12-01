import { render } from "@react-email/render";
import resend from "@lib/resend";
import { OrderType } from "types/order";
import { OrderReceipt } from "@components/Emails/OrderRecieptEmail";
import ForgottenPasswordEmail from "@components/Emails/ForgottenPasswordEmail";
import VerificationEmail from "@components/Emails/VerificationEmail";
import ContactUsEmail from "@components/Emails/ContactUsEmail";


export async function sendOrderReceiptEmail(order: OrderType) {
  const html = await render(<OrderReceipt order={order} />);
  console.log("Sending Order Receipt to : ", order.email);

  const result = await resend.emails.send({
    from: "Kebabs Crib <no-reply@kebabscrib.com>", // or your real domain
    to: order.email ?? "",
    subject: "Your Order Receipt - Kebabs Crib",
    html,
  });
  console.log("email result : ", result);
}

export async function sendForgottenPasswordEmail(resetUrl: string, email : string) {
  const html = await render(<ForgottenPasswordEmail resetUrl={resetUrl} />);
  const result = await resend.emails.send({
    from: "Kebabs Crib <no-reply@kebabscrib.com>",
    to: email,
    subject: "Forgotten Password Link - Kebabscrib",
    html,
  });
  console.log("forgotten email : ", result);
}
export async function sendVerificationEmail(
  username: string,
  verifyUrl: string,
  email : string
) {
  const html = await render(
    <VerificationEmail username={username} verifyUrl={verifyUrl} />,
  );
  const result = await resend.emails.send({
    from: "Kebabs Crib <no-reply@kebabscrib.com>",
    to: email,
    subject: " Verify your Kebabscrib Account - Kebabscrib",
    html,
  });
  console.log("forgotten email : ", result);
}

export async function sendContactEmail(
  name: string,
  email: string,
  message: string,
) {
  const html = await render(
    <ContactUsEmail name={name} email={email} message={message}/>
  );
  await resend.emails.send({
    from: "Kebabs Crib <no-reply@kebabscrib.com>",
    to: "kebabscrib@gmail.com",
    subject: `New Contact Message from ${name}`,
    html,
  });
}

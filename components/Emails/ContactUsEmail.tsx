import { Html, Container, Img, Text, Section } from "@react-email/components";

interface ContactUsEmailProps {
  name: string;
  email: string;
  message: string;
}

const LOGO_URL =
  "https://res.cloudinary.com/dpqto9jrm/image/upload/q_auto,f_auto/v1750239647/KC_Logo_Combination_stacked_green_epqs9c.png";

const ContactUsEmail = ({ name, email, message }: ContactUsEmailProps) => {
  return (
    <Html>
      <Container style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <Section style={{ textAlign: "center", marginBottom: "20px" }}>
          <Img src={LOGO_URL} alt="Kebab's Crib" width="120" />
        </Section>

        <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
          New Contact Us Message
        </Text>

        <Text>
          <strong>Name:</strong> {name}
        </Text>
        <Text>
          <strong>Email:</strong> {email}
        </Text>
        <Text>
          <strong>Message:</strong>
        </Text>
        <Text style={{ whiteSpace: "pre-line", paddingLeft: "10px" }}>
          {message}
        </Text>

        <Text style={{ marginTop: "30px", fontSize: "14px", color: "#555" }}>
          This message was submitted via the Contact Us form on your website.
        </Text>
      </Container>
    </Html>
  );
};

export default ContactUsEmail;

import {
  Html,
  Container,
  Img,
  Text,
  Link,
} from "@react-email/components";

interface VerificationEmailProps {
  username?: string;
  verifyUrl: string;
}

const LOGO_URL = "https://res.cloudinary.com/dpqto9jrm/image/upload/q_auto,f_auto/v1750239647/KC_Logo_Combination_stacked_green_epqs9c.png";

const VerificationEmail = ({ username = "there", verifyUrl }: VerificationEmailProps) => {
  return (
    <Html>
      <Container style={{ padding: "20px", fontFamily: "sans-serif" }}>
        {/* Logo */}
        <Img
          src={LOGO_URL}
          alt="Kebabs Crib"
          width="150"
          style={{ marginBottom: "20px" }}
        />

        <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
          Hi {username},
        </Text>

        <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
          Thanks for signing up with <strong>Kebabs Crib</strong>! Please confirm your email address by clicking the button below.
        </Text>

        <Link
          href={verifyUrl}
          style={{
            display: "inline-block",
            backgroundColor: "#3b7a57", // KebabGreen
            color: "#ffffff",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Verify Email
        </Link>

        <Text style={{ fontSize: "14px", color: "#555" }}>
          If you didn&apos;t create an account, you can safely ignore this email.
        </Text>
      </Container>
    </Html>
  );
};

export default VerificationEmail;

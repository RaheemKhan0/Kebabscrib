import { Html, Container, Img, Text } from "@react-email/components";

const ForgottenPasswordEmail = ({ resetUrl }: { resetUrl: string }) => {
  const LOGO_URL =
    "https://res.cloudinary.com/dpqto9jrm/image/upload/q_auto,f_auto/v1750239647/KC_Logo_Combination_stacked_green_epqs9c.png";

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
        <Text>Please do not share this link with any body</Text> 
        <Text>Click the link below to reset your password:</Text>
        <Text>
          <a href={resetUrl}>{resetUrl}</a>
        </Text>
        <Text>This link expires in 30 minutes.</Text>
      </Container>
    </Html>
  );
};

export default ForgottenPasswordEmail;

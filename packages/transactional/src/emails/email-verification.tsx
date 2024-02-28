import React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  render,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  code: string;
}

export default function EmailVerification({ code }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        Verify your email address to complete your FE Prep registration
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={title}>FE Prep</Text>
            <Text style={text}>Hi,</Text>
            <Text style={text}>
              Thank you for registering for an account on FE Prep. To complete
              your registration, please verify your your account by using the
              following code:
            </Text>
            <Text style={codePlaceholder}>{code}</Text>

            <Text style={text}>Have a nice day!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const renderEmailVerification = (code: string) => {
  return render(<EmailVerification code={code} />);
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const title = {
  ...text,
  fontSize: "22px",
  fontWeight: "700",
  lineHeight: "32px",
};

const codePlaceholder = {
  backgroundColor: "#fbfbfb",
  border: "1px solid #f0f0f0",
  borderRadius: "4px",
  color: "#1c1c1c",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

// const anchor = {
//   textDecoration: "underline",
// };

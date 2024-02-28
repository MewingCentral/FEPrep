import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: string;
}) => {
  return resend.emails.send({
    from: "calebrossr@gmail.com",
    to,
    subject,
    react,
  });
};

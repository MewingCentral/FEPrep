import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "",
    pass: "",
  },
});

export interface MessageInfo {
  to: string;
  subject: string;
  body: string;
}

export const sendMail = async (message: MessageInfo) => {
  const { to, subject, body } = message;
  const mailOptions = {
    from: "FE Prep",
    to,
    subject,
    html: body,
  };
  return transporter.sendMail(mailOptions);
};

import { render } from "@react-email/components";
import { Resend } from "resend";

import EmailVerification from "./emails/email-verification";
import ResetPassword from "./emails/reset-password";

export const resend = new Resend(process.env.RESEND_API_KEY);
export const renderEmailVerification = (code: string) => {
  return render(<EmailVerification code={code} />);
};
export const renderResetPassword = (link: string) => {
  return render(<ResetPassword link={link} />);
};

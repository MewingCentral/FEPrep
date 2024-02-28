import { Resend } from "resend";

export * from "./emails/email-verification";
export * from "./emails/reset-password";
export const resend = new Resend(process.env.RESEND_API_KEY);

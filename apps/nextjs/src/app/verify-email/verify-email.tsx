"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";

import { Button } from "@feprep/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@feprep/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@feprep/ui/input-otp";
import { toast } from "@feprep/ui/toast";

import { sendEmailVerificationEmailAction } from "./send-email-verification-email-form-action";
import { verifyEmailAction } from "./verify-email-action";

export function Verification() {
  const [verifyEmailState, verifyEmailFormAction] = useFormState(
    verifyEmailAction,
    null,
  );

  const [
    sendEmailVerificationEmailState,
    sendEmailVerificationEmailFormAction,
  ] = useFormState(sendEmailVerificationEmailAction, null);

  useEffect(() => {
    if (sendEmailVerificationEmailState?.success) {
      toast.success("Verification email sent");
    }

    if (sendEmailVerificationEmailState?.error) {
      toast.error(sendEmailVerificationEmailState.error);
    }
  });

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Verify Your Email</CardTitle>
            <CardDescription>
              Enter the one-time code sent to your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={verifyEmailFormAction}
              className="mb-2 flex flex-col gap-2"
            >
              <div className="mb-2 flex flex-col items-center gap-2">
                <InputOTP name="code" maxLength={8}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </InputOTPGroup>
                </InputOTP>
                {verifyEmailState?.fieldError?.code && (
                  <p className="text-left text-sm  text-red-500">
                    {verifyEmailState.fieldError.code}
                  </p>
                )}
              </div>
              <Button className="mb-1 mt-2" type="submit">
                Submit
              </Button>
            </form>
            <div className="text-center text-sm">
              Didn&apos;t receive a code?{" "}
              <form
                action={sendEmailVerificationEmailFormAction}
                className="inline"
              >
                <Button type="submit" variant="link" className="h-fit p-0">
                  Resend
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

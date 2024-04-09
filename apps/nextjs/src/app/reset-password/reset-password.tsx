"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

import { Button } from "@feprep/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@feprep/ui/card";
import { Input } from "@feprep/ui/input";
import { Label } from "@feprep/ui/label";
import { toast } from "@feprep/ui/toast";

import { sendResetPasswordEmailAction } from "./send-reset-password-email-action";

export function ResetPassword() {
  const [state, formAction] = useFormState(sendResetPasswordEmailAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }

    if (state?.success) {
      toast.success("Email sent");
      router.push("/sign-in");
    }
  }, [state?.error, state?.success, router]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Forgot Your Password?</CardTitle>
            <CardDescription>
              A password reset link will be sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-2">
              <div className="space-y-1">
                <Label>Your NID</Label>
                <Input placeholder="jd123456" name="nid" />
                {state?.fieldError?.nid && (
                  <p className="text-left text-sm text-red-500">
                    {state.fieldError.nid}
                  </p>
                )}
              </div>
              <Button type="submit" className="mt-2">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

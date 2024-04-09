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

import { resetPasswordAction } from "./reset-password-action";

export function ResetPasswordWithToken({ token }: { token: string }) {
  const [state, formAction] = useFormState(resetPasswordAction, null);

  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [router, state?.error]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-2">
              <input type="hidden" name="token" value={token} />
              <div className="space-y-1">
                <Label>Your New Password</Label>
                <Input placeholder="********" name="password" type="password" />
                {state?.fieldError?.password && (
                  <p className="text-left text-sm text-red-500">
                    {state.fieldError.password}
                  </p>
                )}
              </div>
              <Button type="submit" className="mt-2">
                Reset Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

// import Link from "next/link";

// import { useFormState } from "react-dom";
import { Button } from "@feprep/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@feprep/ui/card";
// import { Input } from "@feprep/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@feprep/ui/input-otp";

// import { Label } from "@feprep/ui/label";

// import { signInAction } from "./sign-in-action";

export function Verification() {
  // const [state, formAction] = useFormState(signInAction, null);

  return (
    <div className="flex min-h-screen">
      <div className="hidden items-center justify-center bg-accent lg:flex lg:flex-1">
        <span className="text-9xl font-bold">:3</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Verify your Email</CardTitle>
              <CardDescription>
                Enter the one-time code sent to your email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-2">
                {/* <form action={formAction} className="flex flex-col gap-2"> */}
                {/* <div className="space-y-1">
                   <Label>NID</Label>
                  <Input name="nid" placeholder="jd123456" /> */}
                {/* {state?.fieldError?.nid && (
                    <p className="text-sm text-red-500">
                      {state.fieldError.nid}
                    </p>
                  )} 
                </div>*/}
                {/*<div className="space-y-1">
                   <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="********"
                  /> */}
                <div className="flex justify-center">
                  <InputOTP maxLength={8}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button className="mt-2" type="submit">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

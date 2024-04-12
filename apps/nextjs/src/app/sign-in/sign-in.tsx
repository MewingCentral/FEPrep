"use client";

import { useState } from "react";
import Link from "next/link";
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

import { signInAction } from "./sign-in-action";

export function SignIn() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [state, formAction] = useFormState(signInAction, null);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>FEPrep Sign In</CardTitle>
            <CardDescription>
              Sign in using your NID and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="flex flex-col gap-2">
              <div className="space-y-1">
                <Label>NID</Label>
                <Input name="nid" placeholder="jd123456" />
                {state?.fieldError?.nid && (
                  <p className="text-sm text-red-500">{state.fieldError.nid}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <div className="flex flex-row space-x-1">
                  <Input
                    name="password"
                    id="password"
                    type={toggle ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="********"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    {!toggle && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.7649 6.07596C14.9991 6.22231 15.0703 6.53079 14.9239 6.76495C14.4849 7.46743 13.9632 8.10645 13.3702 8.66305L14.5712 9.86406C14.7664 10.0593 14.7664 10.3759 14.5712 10.5712C14.3759 10.7664 14.0593 10.7664 13.8641 10.5712L12.6011 9.30817C11.805 9.90283 10.9089 10.3621 9.93375 10.651L10.383 12.3277C10.4544 12.5944 10.2961 12.8685 10.0294 12.94C9.76267 13.0115 9.4885 12.8532 9.41704 12.5865L8.95917 10.8775C8.48743 10.958 8.00036 10.9999 7.50001 10.9999C6.99965 10.9999 6.51257 10.958 6.04082 10.8775L5.58299 12.5864C5.51153 12.8532 5.23737 13.0115 4.97064 12.94C4.7039 12.8686 4.5456 12.5944 4.61706 12.3277L5.06625 10.651C4.09111 10.3621 3.19503 9.90282 2.3989 9.30815L1.1359 10.5712C0.940638 10.7664 0.624058 10.7664 0.428798 10.5712C0.233537 10.3759 0.233537 10.0593 0.428798 9.86405L1.62982 8.66303C1.03682 8.10643 0.515113 7.46742 0.0760677 6.76495C-0.0702867 6.53079 0.000898544 6.22231 0.235065 6.07596C0.469231 5.9296 0.777703 6.00079 0.924058 6.23496C1.40354 7.00213 1.989 7.68057 2.66233 8.2427C2.67315 8.25096 2.6837 8.25972 2.69397 8.26898C4.00897 9.35527 5.65537 9.99991 7.50001 9.99991C10.3078 9.99991 12.6564 8.5063 14.076 6.23495C14.2223 6.00079 14.5308 5.9296 14.7649 6.07596Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                    {toggle && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </Button>
                </div>
                {state?.fieldError?.password && (
                  <p className="text-sm text-red-500">
                    {state.fieldError.password}
                  </p>
                )}
              </div>
              <Button className="mt-2" type="submit">
                Submit
              </Button>
              <p className="text-center text-sm font-light underline">
                <Link href="/reset-password"> Forgot Password?</Link>
              </p>
              <p className="font-regular mt-8 text-center text-sm">
                Don&apos;t have an account?
                <Link href="/sign-up" className="font-semibold">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

import { Button } from "@feprep/ui/button";
import { Input } from "@feprep/ui/input";
import { Label } from "@feprep/ui/label";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-xl font-semibold">Sign in</h1>
      <form className="grid w-full max-w-[300px] gap-1.5">
        <Label htmlFor="email">NID</Label>
        <Input
          id="email"
          name="Email"
          placeholder="jd123456"
          autoComplete="email"
          type="email"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <Button variant="primary">Sign In</Button>
      </form>
      <p className="font-regular mt-4 text-center text-sm">
        Don&apos;t have an account?
        <Link href="/sign-up" className="font-semibold">
          {" "}
          Register
        </Link>
      </p>
    </div>
  );
}

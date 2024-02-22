"use client";

import { Button } from "@feprep/ui/button";
import { Input } from "@feprep/ui/input";
import { Label } from "@feprep/ui/label";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-xl font-semibold">Sign in</h1>
      <form className="grid w-full max-w-[300px] gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Email"
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
    </div>
  );
}

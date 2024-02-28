"use client";

import type { z } from "zod";
import Link from "next/link";

import { cn } from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@feprep/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@feprep/ui/form";
import { Input } from "@feprep/ui/input";
import { SignUpSchema } from "@feprep/validators";

export default function Page() {
  const form = useForm({
    schema: SignUpSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    await fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-xl font-semibold">Sign Up</h1>
      <Card>
        <CardHeader className={cn("w-full max-w-lg md:max-w-xl", "px-6 py-1")}>
          {}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jd123456"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-2" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="px-6 py-1">{}</CardFooter>
      </Card>
      <p className="font-regular mt-2 text-center text-sm">
        Already have an account?
        <Link href="/sign-in" className="font-semibold">
          {" "}
          Login
        </Link>
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { SignUpFormInput } from "@feprep/validators";
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
import { SignUpFormSchema } from "@feprep/validators";

import { api } from "~/trpc/react";

export default function SignUp() {
  const router = useRouter();
  const form = useForm({
    schema: SignUpFormSchema,
    defaultValues: {
      nid: "",
      password: "",
    },
  });

  const { mutateAsync } = api.auth.signUp.useMutation();

  const onSubmit = async (values: SignUpFormInput) => {
    try {
      await mutateAsync(values);
      router.push("/explore");
    } catch {
      // noop
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden items-center justify-center bg-accent lg:flex lg:flex-1">
        {/* Add logo here */}
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-lg">
          <h1 className="mb-4 text-center text-xl font-semibold">Sign Up</h1>
          <Card>
            <CardHeader
              className={cn("w-full max-w-lg md:max-w-xl", "px-6 py-1")}
            >
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
                    name="nid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="jd123456"
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
          <p className="font-regular mt-4 text-center text-sm">
            Already have an account?
            <Link href="/sign-in" className="font-semibold">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

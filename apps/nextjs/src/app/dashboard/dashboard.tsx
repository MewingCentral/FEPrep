"use client";

import { useRouter } from "next/navigation";

import { User } from "@feprep/auth";
import { Button } from "@feprep/ui/button";

import { api } from "~/trpc/react";

export function Dashboard({ user }: { user: User | null }) {
  return (
    <main>
      <div>This is the dashboard</div>
      <AuthButton user={user} />
    </main>
  );
}

function AuthButton({ user }: { user: User | null }) {
  const { mutateAsync } = api.auth.signOut.useMutation();
  const router = useRouter();

  if (user) {
    return (
      <Button
        onClick={async () => {
          try {
            await mutateAsync();
            router.push("/sign-in");
          } catch {
            // noop
          }
        }}
      >
        Sign out
      </Button>
    );
  }
  return <div>Not signed in</div>;
}

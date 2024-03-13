import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { User } from "@feprep/auth";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LapTimerIcon,
  RocketIcon,
  ShuffleIcon,
} from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import { Separator } from "@feprep/ui/separator";

import { api } from "~/trpc/react";

export function Nav({ user }: { user: User | null }) {
  function AuthButton({ user }: { user: User | null }) {
    const { mutateAsync } = api.auth.signOut.useMutation();
    const router = useRouter();

    if (user) {
      return (
        <Button
          onClick={async () => {
            await mutateAsync();
            router.push("/sign-in");
          }}
        >
          Sign out
        </Button>
      );
    }
    return (
      <h1 className="text-slate hidden text-left text-xl font-normal md:block">
        Not Signed In
      </h1>
    );
  }
  return (
    <main className="flex flex-row justify-start p-6">
      {/* left side */}
      <div className="mr-5 flex flex-1 flex-row gap-3">
        <Image
          src="/Ellipse-3.svg"
          width={25}
          height={25}
          alt="FEPrep Logo"
          className="hidden md:block"
        />
        <Link
          href="/"
          className="hidden text-left text-xl font-semibold hover:underline md:block"
        >
          FEPrep
        </Link>
        <Separator
          orientation="vertical"
          decorative={true}
          className="hidden w-0.5 bg-foreground md:block"
        />
        <h1 className="text-slate hidden text-left text-xl font-normal underline md:block">
          Topics
        </h1>
        <ArrowLeftIcon width="25" height="25" />
        <ArrowRightIcon width="25" height="25" />
        <ShuffleIcon width="25" height="25" />
      </div>
      {/* center */}
      <div className="flex grow flex-row justify-center gap-2">
        <LapTimerIcon width="25" height="25" className="hidden md:block" />
        {/* Link onclick behavior to be updated once question section is done */}
        <Link
          className="text-slate hidden text-left text-xl font-normal md:block"
          href="/dashboard"
        >
          Timer
        </Link>
        <Separator
          orientation="vertical"
          decorative={true}
          className="hidden w-0.5 bg-foreground md:block"
        />
        <RocketIcon width="25" height="25" className="hidden md:block" />
        {/* Link onclick behavior to be updated once question section is done */}
        <Link
          className="text-slate hidden text-left text-xl font-medium md:block"
          href="/dashboard"
        >
          Solution
        </Link>
      </div>
      {/* right */}
      <div className="flex flex-1 flex-row-reverse items-end gap-3">
        <AuthButton user={user} />
      </div>
    </main>
  );
}

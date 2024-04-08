import Image from "next/image";
import Link from "next/link";

import type { User } from "@feprep/auth";
import { Button } from "@feprep/ui/button";
import { Separator } from "@feprep/ui/separator";

import { signOutAction } from "~/utils/actions";

export async function Nav({ user }: { user: User | null }) {
  return (
    <nav className="flex h-16 items-center justify-between px-6">
      <div className="mr-5 flex items-center gap-3">
        <Link href="/" className="flex gap-3 text-left text-xl font-semibold">
          <Image
            src="/Ellipse-3.svg"
            width={25}
            height={25}
            alt="FEPrep Logo"
          />
          FEPrep
        </Link>
        <Separator orientation="vertical" className="h-8" decorative />
        <Link href="/about">About</Link>
      </div>

      <div className="flex items-center">
        {user ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.email}</span>
            <form action={signOutAction}>
              <Button size="sm" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        ) : (
          <Link href="/sign-in" passHref>
            <Button size="sm">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

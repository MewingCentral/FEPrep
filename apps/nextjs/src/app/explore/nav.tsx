import Image from "next/image";
import Link from "next/link";

import type { User } from "@feprep/auth";
import { Button } from "@feprep/ui/button";
import { Separator } from "@feprep/ui/separator";

import { signOutAction } from "~/utils/actions";

export async function Nav({ user }: { user: User | null }) {
  return (
    <nav className="flex h-16 items-center justify-between px-6">
      <div className="mr-5 flex h-8 items-center gap-3">
        <Image src="/Ellipse-3.svg" width={25} height={25} alt="FEPrep Logo" />
        <Link href="/" className="text-left text-xl font-semibold">
          FEPrep
        </Link>
        <Separator orientation="vertical" decorative />
        <Link href="/dashboard">Dashboard</Link>
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
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

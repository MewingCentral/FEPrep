"use client";

import Image from "next/image";
import Link from "next/link";

import { Separator } from "@feprep/ui/separator";

import { useUser } from "~/utils/user";

export function Nav() {
  const user = useUser();

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

      {user && <div>Welcome, {user.email}</div>}
    </nav>
  );
}

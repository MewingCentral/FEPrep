"use client";

// import { useRouter } from "next/navigation";
import type { User } from "@feprep/auth";
import { Separator } from "@feprep/ui/separator";

import { Left } from "./components/left";
// import { api } from "~/trpc/react";
import { Nav } from "./components/nav";
import { Right } from "./components/right";

export function Dashboard({ user }: { user: User | null }) {
  return (
    <div className="flex h-screen flex-col">
      <Nav user={user} />
      <Separator
        orientation="horizontal"
        decorative={true}
        className=" w-screen border bg-card"
      />
      <main className="flex flex-1 gap-4 p-4">
        <div className="h-full flex-1">
          <Left id=" " />
        </div>

        <div className="h-full flex-1">
          <Right />
        </div>
      </main>
    </div>
  );
}

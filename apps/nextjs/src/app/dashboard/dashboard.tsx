"use client";

// import { useRouter } from "next/navigation";
import type { User } from "@feprep/auth";

import { Left } from "./components/left";
// import { api } from "~/trpc/react";
import { Nav } from "./components/nav";
import { Right } from "./components/right";

// import { Right } from "./components/right"; // for when this is implemented

export function Dashboard({ user }: { user: User | null }) {
  return (
    <div className="flex h-screen flex-col">
      <Nav user={user} />

      {/* <AuthButton user={user} /> */}
      <main className="flex flex-1 gap-4 p-4">
        <div className="h-full flex-1">
          <Left />
        </div>

        <div className="h-full flex-1">
          {/* Just a placeholder background for visibility */}
          <Right />
        </div>
      </main>
    </div>
  );
}

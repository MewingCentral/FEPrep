"use client";

// import { useRouter } from "next/navigation";

// import { User } from "@feprep/auth";
// import { Button } from "@feprep/ui/button";

// import { api } from "~/trpc/react";
import { Nav } from "./components/nav";
import { Right } from "./components/right"; // for when this is implemented

export function Dashboard() {
  return (
    <main>
      <Nav />
      {/* <AuthButton user={user} /> */}
      <main className="flex flex-1 gap-6">
        <div className="flex-1 h-full">
          <Left />
        </div>

        <div className="flex-1 h-full">
          {/* Just a placeholder background for visibility */}
          {/* <Right /> */}
        </div>
      </main>
    </div>
  );
}
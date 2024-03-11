"use client";

// import { useRouter } from "next/navigation";
// import { User } from "@feprep/auth";
import { useRouter } from "next/navigation";

import { Left } from "./components/left";
// import { Button } from "@feprep/ui/button";

// import { api } from "~/trpc/react";
import { Nav } from "./components/nav";

// import { Right } from "./components/right"; // for when this is implemented

// export function Dashboard({ user }: { user: User | null }) {
//   return (
//     <main>
//       <Nav />
//       {/* <AuthButton user={user} /> */}
//     </main>
//   );
// }

export function Dashboard() {
  return (
    <div className="flex h-screen flex-col">
      <Nav />

      {/* <AuthButton user={user} /> */}
      <main className="flex flex-1">
        <div className="h-full w-1/2">
          <Left />
        </div>

        <div className="h-full w-1/2 bg-gray-200">
          {/* Just a placeholder background for visibility */}
          {/* <Right /> */}
        </div>
      </main>
    </div>
  );
}

// function AuthButton({ user }: { user: User | null }) {
//   const { mutateAsync } = api.auth.signOut.useMutation();
//   const router = useRouter();

//   if (user) {
//     return (
//       <Button
//         onClick={async () => {
//           try {
//             await mutateAsync();
//             router.push("/sign-in");
//           } catch {
//             // noop
//           }
//         }}
//       >
//         Sign out
//       </Button>
//     );
//   }
//   return <div>Not signed in</div>;
// }

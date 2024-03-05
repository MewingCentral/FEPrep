"use client";

import { useRouter } from "next/navigation";

import { User } from "@feprep/auth";
import { Button } from "@feprep/ui/button";

import { api } from "~/trpc/react";
import { Nav } from "./components/nav";
import { Workbench } from "./components/workbench";

export function Dashboard({ user }: { user: User | null }) {
  return (
    <main>
      <Nav />
      {/* <AuthButton user={user} /> */}
      <Workbench />
    </main>
  );
}

// export function Dashboard() {
//   return (
//     <main>
//       <div className="container grid grid-cols-2">
//         {/* <div className="left-section border border-white rounded-sm bg-gray-200 text-black">
//           <h1> left side </h1>
//         </div> */}
//         <div className="right-section border border-white rounded-sm bg-gray-200 text-black">
//           <div className="">
//             <h1>right side</h1>
//           </div>
//           {/* <AuthButton user={user} /> */}
//         </div>
//       </div>

//     </main>
//   );
// }

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

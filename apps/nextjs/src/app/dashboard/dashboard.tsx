"use client";

// import { useRouter } from "next/navigation";
// import { User } from "@feprep/auth";
import { useRouter } from "next/navigation";

// import { Button } from "@feprep/ui/button";

// import { api } from "~/trpc/react";
import { Nav } from "./components/nav";
import { Left } from "./components/left";
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
    <div className="flex flex-col h-screen">
      <Nav />
    
      {/* <AuthButton user={user} /> */}
      <main className="flex flex-1">
        <div className="w-1/2 h-full">
          <Left />
        </div>
      
        <div className="w-1/2 h-full bg-gray-200"> {/* Just a placeholder background for visibility */}
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

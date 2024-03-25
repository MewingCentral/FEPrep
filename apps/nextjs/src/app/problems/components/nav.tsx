import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { User } from "@feprep/auth";
import { SECTIONS, SEMESTERS } from "@feprep/consts";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LapTimerIcon,
  RocketIcon,
  ShuffleIcon,
} from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import { Separator } from "@feprep/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@feprep/ui/sheet";

import { api } from "~/trpc/react";

// placeholder content until real question names are available
const questionNames = new Array(20).fill(null).map((_, i) => {
  const randomSemester =
    SEMESTERS[Math.floor(Math.random() * SEMESTERS.length)];
  const randomSection =
    SECTIONS[Math.floor(Math.random() * SECTIONS.length)]?.split(":")[0];
  return `${randomSemester}, ${randomSection}, Question ${i + 1}`;
});

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
          className="hover:underline"
        >
          Sign out
        </Button>
      );
    }
    console.log(questionNames);
    return (
      <div className="flex flex-row gap-2">
        <Link
          className="hidden text-left text-lg font-medium text-muted-foreground transition-all duration-200 hover:text-foreground md:block"
          href="/sign-up"
        >
          Register
        </Link>
        <p className="hidden text-lg font-normal text-muted-foreground md:block">
          or
        </p>
        <Link
          className="hidden text-left text-lg font-medium text-muted-foreground transition-all duration-200 hover:text-foreground md:block"
          href="/sign-in"
        >
          Sign in
        </Link>
      </div>
    );
  }
  return (
    <main className="flex flex-row justify-start px-10 py-6">
      {/* left side */}
      <div className="mr-5 flex flex-1 flex-row gap-3">
        <Link href="/">
          <Image
            src="/Ellipse-3.svg"
            width={25}
            height={25}
            alt="FEPrep Logo"
            className="hidden transition-transform duration-200 hover:scale-125 md:block"
          />
        </Link>
        <Separator
          orientation="vertical"
          decorative={true}
          className="hidden bg-foreground md:block"
        />
        {/* Link onclick behavior to be updated once topics component is done */}
        <Sheet>
          <SheetTrigger asChild>
            <span className="text-slate hidden text-left text-lg font-semibold underline transition-all duration-200 hover:cursor-pointer hover:text-muted-foreground md:block">
              Questions
            </span>
          </SheetTrigger>
          <SheetContent side="left" className="max-h-screen overflow-y-scroll">
            <SheetHeader className="mb-8">
              <SheetTitle>More Questions:</SheetTitle>
            </SheetHeader>
            {questionNames.map((questionName, index) => (
              <Button
                key={index}
                id={`question-${index}`}
                className="col-span-3 mb-2"
              >
                {questionName}
              </Button>
            ))}
          </SheetContent>
        </Sheet>
        {/* Icon onclick behavior to be updated once question section is done */}
        <ArrowLeftIcon
          width="25"
          height="25"
          className="text-muted-foreground transition-all duration-200 hover:scale-125 hover:cursor-pointer"
        />
        <ArrowRightIcon
          width="25"
          height="25"
          className="text-muted-foreground transition-all duration-200 hover:scale-125 hover:cursor-pointer"
        />
        <ShuffleIcon
          width="25"
          height="25"
          className="text-muted-foreground transition-all duration-200 hover:scale-125 hover:cursor-pointer"
        />
      </div>
      {/* center */}
      <div className="flex grow flex-row justify-center gap-3">
        {/* Link onclick behavior to be updated once question section is done */}
        <Link
          className="hidden gap-2 text-left text-lg font-medium text-foreground transition-all duration-200 hover:text-muted-foreground md:flex md:items-center"
          href="/dashboard"
        >
          <LapTimerIcon width="25" height="25" className="hidden md:block" />{" "}
          <span>Timer</span>
        </Link>
        <Separator
          orientation="vertical"
          decorative={true}
          className="hidden bg-foreground md:block"
        />
        <Link
          className="hidden gap-2 text-left text-lg font-semibold text-foreground transition-all duration-200 hover:text-muted-foreground md:flex md:items-center"
          href="/dashboard"
        >
          <RocketIcon width="25" height="25" className="hidden md:block" />{" "}
          <span>Solution</span>
        </Link>
      </div>
      {/* right */}
      <div className="flex flex-1 flex-row-reverse items-end gap-3">
        <AuthButton user={user} />
      </div>
    </main>
  );
}

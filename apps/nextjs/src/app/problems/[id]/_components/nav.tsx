import Image from "next/image";
import Link from "next/link";

import type { RouterOutputs } from "@feprep/api";
import type { User } from "@feprep/auth";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  RocketIcon,
  ShuffleIcon,
} from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import { Separator } from "@feprep/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@feprep/ui/tooltip";

import { signOutAction } from "~/utils/actions";
import { QuestionsSheet } from "./question-sheet";
import { TimerButton } from "./timer-button";

export function Nav({
  user,
  question,
}: {
  user: User | null;
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  return (
    <nav className="flex h-14 items-center justify-between border-b px-6">
      <div className="mr-4 flex flex-none items-center">
        <Link href="/explore" className="flex  gap-3 text-xl font-semibold">
          <Image
            src="/Ellipse-3.svg"
            width={25}
            height={25}
            alt="FEPrep Logo"
          />
          <span className="hidden lg:block">FEPrep</span>
        </Link>

        <Separator orientation="vertical" className="mx-4 h-8" decorative />

        <QuestionsSheet question={question} />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className=" rounded-l-none rounded-r-none focus-visible:bg-accent focus-visible:ring-0"
                variant="outline"
                size="icon"
              >
                <ArrowLeftIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Previous Question</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className=" rounded-l-none rounded-r-none border-l-0 focus-visible:bg-accent focus-visible:ring-0"
                size="icon"
              >
                <ArrowRightIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Next Question</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className=" rounded-l-none border-l-0 focus-visible:bg-accent focus-visible:ring-0"
                size="icon"
              >
                <ShuffleIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Random Question</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mr-4 flex gap-2">
        <TimerButton />
        <Button variant="outline" className="w-9 px-0 md:w-auto md:px-4">
          <RocketIcon className="md:mr-2" />
          <span className="hidden md:flex">Solution</span>
        </Button>
      </div>

      <div className="flex items-center">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline">Welcome, {user.email}</span>
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

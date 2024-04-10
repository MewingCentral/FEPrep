import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import type { RouterOutputs } from "@feprep/api";
import type { User } from "@feprep/auth";
import { ArrowLeftIcon, ArrowRightIcon, ShuffleIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import { Separator } from "@feprep/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@feprep/ui/tooltip";

import { api } from "~/trpc/server";
import { signOutAction } from "~/utils/actions";
import { QuestionsSheet } from "./question-sheet";
import { QuestionToggleButton } from "./question-toggle-button";
import { TimerButton } from "./timer-button";

export async function Nav({
  user,
  question,
}: {
  user: User | null;
  question: NonNullable<RouterOutputs["questions"]["byId"]>;
}) {
  const questionsCount = await api.questions.count();

  const nextQuestionId =
    question.id + 1 <= questionsCount ? question.id + 1 : question.id;
  const prevQuestionId = question.id - 1 >= 1 ? question.id - 1 : question.id;

  return (
    <nav className="flex min-h-14 items-center justify-between border-b px-6">
      <div className="mr-4 flex flex-none items-center">
        <Link href="/explore" className="flex  gap-3 text-xl font-semibold">
          <Image
            src="/Ellipse-3.svg"
            className="h-[25px] w-[25px]"
            width={25}
            height={25}
            alt="FEPrep Logo"
          />
          <span className="hidden lg:block">FEPrep</span>
        </Link>

        <Separator orientation="vertical" className="mx-4 h-8" decorative />

        <QuestionsSheet question={question} />

        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                asChild
                className="rounded-l-none rounded-r-none focus-visible:bg-accent focus-visible:ring-0"
                variant="outline"
                size="icon"
              >
                <Link href={`/problems/${prevQuestionId}`}>
                  <ArrowLeftIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Previous Question</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className=" rounded-l-none rounded-r-none border-l-0 focus-visible:bg-accent focus-visible:ring-0"
                size="icon"
                asChild
              >
                <Link href={`/problems/${nextQuestionId}`}>
                  <ArrowRightIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Next Question</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <form>
                <Button
                  formAction={async () => {
                    "use server";
                    const randomQuestionId =
                      await api.questions.randomQuestionId();
                    redirect(`/problems/${randomQuestionId}`);
                  }}
                  variant="outline"
                  className=" rounded-l-none border-l-0 focus-visible:bg-accent focus-visible:ring-0"
                  size="icon"
                >
                  <ShuffleIcon />
                </Button>
              </form>
            </TooltipTrigger>
            <TooltipContent>Random Question</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mr-4 flex gap-2">
        <TimerButton />
        <QuestionToggleButton />
      </div>

      <div className="flex items-center">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Welcome, {user.email}</span>
            {user.emailVerified ? null : (
              <Link href="/verify-email" passHref>
                <Button variant="secondary" size="sm">
                  Verify Email
                </Button>
              </Link>
            )}
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

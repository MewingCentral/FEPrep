import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { User } from "@feprep/auth";
import { TOPICS } from "@feprep/consts";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LapTimerIcon,
  RocketIcon,
  ShuffleIcon,
} from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@feprep/ui/hover-card";
import { Label } from "@feprep/ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@feprep/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@feprep/ui/popover";
import { Separator } from "@feprep/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@feprep/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@feprep/ui/table";

import { api } from "~/trpc/react";
import questions from "./questions";

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
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger href="/">
            <Image
              src="/Ellipse-3.svg"
              width={25}
              height={25}
              alt="FEPrep Logo"
              className="hidden transition-transform duration-200 hover:scale-125 md:block"
            />
          </HoverCardTrigger>
          <HoverCardContent className="h-fit w-fit text-sm">
            Homepage
          </HoverCardContent>
        </HoverCard>
        <Separator
          orientation="vertical"
          decorative={true}
          className="hidden bg-foreground md:block"
        />
        <Sheet>
          <SheetTrigger asChild>
            <span className="text-slate hidden text-left text-lg font-semibold underline transition-all duration-200 hover:cursor-pointer hover:text-muted-foreground md:block">
              Questions
            </span>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="max-h-screen min-w-[40vw] overflow-auto"
          >
            <SheetHeader className="mb-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <SheetTitle>Topics</SheetTitle>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-fit gap-3 p-6 lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          {TOPICS.map((topic) => (
                            <NavigationMenuItem
                              key={topic}
                              className="rounded-md p-1 transition-all duration-200 hover:cursor-pointer hover:bg-slate-100"
                            >
                              {topic}
                            </NavigationMenuItem>
                          ))}
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </SheetHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Semester</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead className="text-right">Difficulty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.question}>
                    <TableCell>{question.semester}</TableCell>
                    <TableCell>{question.section}</TableCell>
                    <TableCell>{question.question}</TableCell>
                    <TableCell
                      className={`text-right ${question.difficulty === "Easy" ? "text-green-500" : question.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}`}
                    >
                      {question.difficulty}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SheetContent>
        </Sheet>
        {/* Icon onclick behavior to be updated once question section is done */}
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger>
            <ArrowLeftIcon
              width="25"
              height="25"
              className="text-muted-foreground transition-all duration-200 hover:scale-125 hover:cursor-pointer"
            />
          </HoverCardTrigger>
          <HoverCardContent className="h-fit w-fit text-sm">
            Previous
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger>
            <ArrowRightIcon
              width="25"
              height="25"
              className="text-muted-foreground transition-all duration-200 hover:scale-125 hover:cursor-pointer"
            />
          </HoverCardTrigger>
          <HoverCardContent className="h-fit w-fit text-sm">
            Next
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger>
            <ShuffleIcon
              width="25"
              height="25"
              className="text-muted-foreground transition-all duration-200 hover:scale-125 hover:cursor-pointer"
            />
          </HoverCardTrigger>
          <HoverCardContent className="h-fit w-fit text-sm">
            Random Question
          </HoverCardContent>
        </HoverCard>
      </div>
      {/* center */}
      <div className="flex grow flex-row justify-center gap-3">
        {/* Link onclick behavior to be updated once question section is done */}
        <Label className="hidden gap-2 text-left text-lg font-medium text-foreground transition-all duration-200 hover:cursor-pointer hover:text-muted-foreground md:flex md:items-center">
          {" "}
          <Popover>
            <PopoverTrigger>
              <HoverCard openDelay={50} closeDelay={50}>
                <HoverCardTrigger className="hidden gap-2 text-left text-lg font-medium text-foreground transition-all duration-200 hover:text-muted-foreground md:flex md:items-center">
                  <LapTimerIcon
                    width="25"
                    height="25"
                    className="hidden md:block"
                  />{" "}
                  <span>Timer</span>
                </HoverCardTrigger>
                <HoverCardContent className="h-fit w-fit text-sm">
                  Set Timer
                </HoverCardContent>
              </HoverCard>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="grid grid-cols-1 gap-4 gap-y-4">
                <Button>10 minutes</Button>
                <Button>15 minutes</Button>
                <Button>20 minutes</Button>
              </div>
            </PopoverContent>
          </Popover>
        </Label>
        <Separator
          orientation="vertical"
          decorative={true}
          className="hidden bg-foreground md:block"
        />
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger>
            <Label className="hidden gap-2 text-left text-lg font-semibold text-foreground transition-all duration-200 hover:cursor-pointer hover:text-muted-foreground md:flex md:items-center">
              <RocketIcon width="25" height="25" className="hidden md:block" />{" "}
              <span>Solution</span>
            </Label>
          </HoverCardTrigger>
          <HoverCardContent className="h-fit w-fit text-sm">
            View Solution
          </HoverCardContent>
        </HoverCard>
      </div>
      {/* right */}
      <div className="flex flex-1 flex-row-reverse items-end gap-3">
        <AuthButton user={user} />
      </div>
    </main>
  );
}

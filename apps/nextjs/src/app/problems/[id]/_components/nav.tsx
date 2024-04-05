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

function TimerButton() {
  const [open, setOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
  const hours = String(Math.floor(Number(minutes) / 60)).padStart(2, "0");
  const seconds = String(secondsElapsed % 60).padStart(2, "0");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && secondsElapsed !== 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {open ? (
        <motion.div
          key="hello"
          className="flex items-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <Button
            variant="outline"
            size="icon"
            className=" rounded-r-none"
            onClick={() => setOpen(false)}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            className=" rounded-l-none rounded-r-none border-l-0 border-r-0"
            onClick={() => {
              setIsRunning(!isRunning);
            }}
          >
            <span className="mr-2">
              {isRunning ? <PauseIcon /> : <PlayIcon />}
            </span>
            <span>
              {hours}:{minutes}:{seconds}
            </span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className=" rounded-l-none"
            onClick={() => {
              setSecondsElapsed(0);
              setIsRunning(false);
            }}
          >
            <ResetIcon />
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="world"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
            <LapTimerIcon />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuestionsSheet() {
  return (
    <main className="flex flex-row justify-start px-10 py-6">
      {/* left side */}
      <div className="mr-5 flex flex-1 flex-row items-center justify-center gap-3">
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
            <span className="text-slate hidden text-left text-base font-semibold underline transition-all duration-200 hover:cursor-pointer hover:text-muted-foreground md:block">
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
                      <ul className="grid w-fit gap-3 whitespace-nowrap p-6 lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          {TOPICS.map((topic) => (
                            <NavigationMenuItem
                              key={topic}
                              className="rounded-md px-4 py-1 transition-all duration-200 hover:cursor-pointer hover:bg-secondary"
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
          <HoverCard openDelay={50} closeDelay={50}>
            <HoverCardTrigger className="hidden gap-2 text-left text-lg font-medium text-foreground transition-all duration-200 hover:text-muted-foreground md:flex md:items-center">
              <LapTimerIcon
                width="25"
                height="25"
                className="hidden md:block"
              />{" "}
              {/* <span>Timer</span> */}
              <Timer time={0} />
            </HoverCardTrigger>
            <HoverCardContent className="flex h-fit w-fit flex-row gap-1 text-sm">
              {/* Start timer */}
              <Button
                variant="outline"
                size="icon"
                className="transition-all duration-200 hover:scale-110"
              >
                <PlayIcon width="20" height="20" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="transition-all duration-200 hover:scale-110"
              >
                <PauseIcon width="20" height="20" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="transition-all duration-200 hover:scale-110"
              >
                <ResetIcon width="20" height="20" />
              </Button>
            </HoverCardContent>
          </HoverCard>
        </Label>
        <Separator
          orientation="vertical"
          decorative={true}
          className="hidden bg-foreground md:block"
        />
        <Label className="hidden gap-2 text-left text-lg font-semibold text-foreground transition-all duration-200 hover:cursor-pointer hover:text-muted-foreground md:flex md:items-center">
          <RocketIcon width="25" height="25" className="hidden md:block" />{" "}
          <span className="text-sm">View Solution</span>
        </Label>
      </div>
      {/* right */}
      <div className="flex flex-1 flex-row-reverse items-end gap-3">
        <AuthButton user={user} />
      </div>
    </main>
  );
}

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { RouterOutputs } from "@feprep/api";
import type { User } from "@feprep/auth";
import { DIFFICULTIES, SEMESTERS, TOPICS } from "@feprep/consts";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ReloadIcon,
  ShuffleIcon,
} from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@feprep/ui/dropdown-menu";
import { Input } from "@feprep/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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

import { CreateQuestionForm } from "./create-question-form";

export function QuestionsTable({
  columns,
  promise,
  user,
}: {
  columns: ColumnDef<RouterOutputs["questions"]["all"][number]>[];
  promise: Promise<RouterOutputs["questions"]["all"]>;
  user: User | null;
}) {
  const questions = use(promise);
  const router = useRouter();
  const table = useReactTable({
    data: questions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      {/* Filtering options */}
      <div className="mb-4 flex items-center gap-2">
        {user?.type === "Teacher" && <CreateQuestionButton user={user} />}
        <TopicsDropdownMenu />
        <DifficultyDropdownMenu />
        <SemesterDropdownMenu />
        <div className="relative flex flex-1 items-center">
          <MagnifyingGlassIcon className="absolute left-2.5 text-muted-foreground" />
          <Input className="pl-8" placeholder="Search questions" />
        </div>
        <Button>
          <ShuffleIcon className="mr-2 h-4 w-4" />
          Pick One
        </Button>
      </div>

      {/* List of questions */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  role="link"
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/problems/${row.original.id}`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function TopicsDropdownMenu() {
  const [selectedTopics, setSelectedTopics] = useState<
    (typeof TOPICS)[number][]
  >([]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <span>Topics</span>
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {TOPICS.map((topic) => (
          <DropdownMenuCheckboxItem
            key={topic}
            checked={selectedTopics.includes(topic)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={(checked) => {
              setSelectedTopics((prev) => {
                if (checked) {
                  return [...prev, topic];
                }
                return prev.filter((t) => t !== topic);
              });
            }}
          >
            {topic}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={() => setSelectedTopics([])}
        >
          <ReloadIcon className="mr-2 h-4 w-4" />
          <span>Reset</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DifficultyDropdownMenu() {
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    (typeof DIFFICULTIES)[number][]
  >([]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <span>Difficulties</span>
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {DIFFICULTIES.map((difficulty) => (
          <DropdownMenuCheckboxItem
            key={difficulty}
            checked={selectedDifficulties.includes(difficulty)}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={(checked) => {
              setSelectedDifficulties((prev) => {
                if (checked) {
                  return [...prev, difficulty];
                }
                return prev.filter((d) => d !== difficulty);
              });
            }}
          >
            {difficulty}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={() => setSelectedDifficulties([])}
        >
          <ReloadIcon className="mr-2 h-4 w-4" />
          <span>Reset</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SemesterDropdownMenu() {
  const [selectedSemesters, setSelectedSemesters] = useState<
    (typeof SEMESTERS)[number][]
  >([]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <span>Semesters</span>
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SEMESTERS.map((semester) => (
          <DropdownMenuCheckboxItem
            key={semester}
            onSelect={(e) => e.preventDefault()}
            checked={selectedSemesters.includes(semester)}
            onCheckedChange={(checked) => {
              setSelectedSemesters((prev) => {
                if (checked) {
                  return [...prev, semester];
                }
                return prev?.filter((s) => s !== semester);
              });
            }}
          >
            {semester}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={() => setSelectedSemesters([])}
        >
          <ReloadIcon className="mr-2 h-4 w-4" />
          <span>Reset</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CreateQuestionButton({ user }: { user: User }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Question
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Create Question</SheetTitle>
          <SheetDescription>
            Fill out the form below to create a new question to be added to the
            site!
          </SheetDescription>
        </SheetHeader>
        <CreateQuestionForm user={user} />
      </SheetContent>
    </Sheet>
  );
}

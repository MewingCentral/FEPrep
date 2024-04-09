"use client";

import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import type { Dispatch, SetStateAction } from "react";
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

import { api } from "~/trpc/react";
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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const questions = use(promise);
  const allQuestions = api.questions.all.useQuery(undefined, {
    initialData: questions,
  });
  const router = useRouter();
  const table = useReactTable({
    data: allQuestions.data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const resetAllFilters = () => {
    setColumnFilters([]);
  };

  return (
    <div>
      {/* Filtering options */}
      <div className="mb-4 flex items-center gap-2">
        {user?.type === "Teacher" && <CreateQuestionButton user={user} />}
        <TopicsDropdownMenu
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <DifficultyDropdownMenu
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <SemesterDropdownMenu
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <Button onClick={resetAllFilters}>
          <ReloadIcon className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
        <div className="relative flex flex-1 items-center">
          <MagnifyingGlassIcon className="absolute left-2.5 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search questions"
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
            }}
          />
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
                  No Questions
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function TopicsDropdownMenu({
  columnFilters,
  setColumnFilters,
}: {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
}) {
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
            checked={columnFilters.some(
              (f) =>
                f.id === "Topic" && (f.value as typeof TOPICS).includes(topic),
            )}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={(checked) => {
              setColumnFilters((previousFilter) => {
                const topicFilter = previousFilter.find(
                  (f) => f.id === "Topic",
                );

                // If a column filter for the topic column exists
                if (topicFilter) {
                  // If the topic is checked, add it to the filter
                  if (checked) {
                    return previousFilter.map((f) =>
                      f.id === "Topic"
                        ? {
                            ...f,
                            value: [...(f.value as typeof TOPICS), topic],
                          }
                        : f,
                    );
                  }
                  // If the topic is unchecked, remove it from the filter
                  const updatedValue = (
                    topicFilter.value as typeof TOPICS
                  ).filter((t: (typeof TOPICS)[number]) => t !== topic);
                  if (updatedValue.length === 0) {
                    // Clear the filter if the value is empty
                    return previousFilter.filter((f) => f.id !== "Topic");
                  }
                  return previousFilter.map((f) =>
                    f.id === "Topic" ? { ...f, value: updatedValue } : f,
                  );
                }

                // If a column filter for the topic column does not exist, create a new filter
                if (checked) {
                  return [...previousFilter, { id: "Topic", value: [topic] }];
                }

                // If the topic is unchecked, return the previous filter
                return previousFilter;
              });
            }}
          >
            {topic}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={() =>
            setColumnFilters((prev) => prev.filter((f) => f.id !== "Topic"))
          }
        >
          <ReloadIcon className="mr-2 h-4 w-4" />
          <span>Reset</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DifficultyDropdownMenu({
  columnFilters,
  setColumnFilters,
}: {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
}) {
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
            checked={columnFilters.some(
              (f) =>
                f.id === "Difficulty" &&
                (f.value as typeof DIFFICULTIES).includes(difficulty),
            )}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={(checked) => {
              setColumnFilters((prevFilters) => {
                const difficultyFilter = prevFilters.find(
                  (f) => f.id === "Difficulty",
                );

                if (difficultyFilter) {
                  if (checked) {
                    return prevFilters.map((f) =>
                      f.id === "Difficulty"
                        ? {
                            ...f,
                            value: [
                              ...(f.value as typeof DIFFICULTIES),
                              difficulty,
                            ],
                          }
                        : f,
                    );
                  }

                  const updatedValue = (
                    difficultyFilter.value as typeof DIFFICULTIES
                  ).filter(
                    (d: (typeof DIFFICULTIES)[number]) => d !== difficulty,
                  );
                  if (updatedValue.length === 0) {
                    return prevFilters.filter((f) => f.id !== "Difficulty");
                  }
                  return prevFilters.map((f) =>
                    f.id === "Difficulty" ? { ...f, value: updatedValue } : f,
                  );
                }

                if (checked) {
                  return [
                    ...prevFilters,
                    { id: "Difficulty", value: [difficulty] },
                  ];
                }

                return prevFilters;
              });
            }}
          >
            {difficulty}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={() =>
            setColumnFilters((prev) =>
              prev.filter((f) => f.id !== "Difficulty"),
            )
          }
        >
          <ReloadIcon className="mr-2 h-4 w-4" />
          <span>Reset</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SemesterDropdownMenu({
  columnFilters,
  setColumnFilters,
}: {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
}) {
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
            checked={columnFilters.some(
              (f) =>
                f.id === "Semester" &&
                (f.value as typeof SEMESTERS).includes(semester),
            )}
            onCheckedChange={(checked) => {
              setColumnFilters((prevFilters) => {
                const semesterFilter = prevFilters.find(
                  (f) => f.id === "Semester",
                );

                // If a column filter for the topic column exists
                if (semesterFilter) {
                  // If the topic is checked, add it to the filter
                  if (checked) {
                    return prevFilters.map((f) =>
                      f.id === "Semester"
                        ? {
                            ...f,
                            value: [...(f.value as typeof SEMESTERS), semester],
                          }
                        : f,
                    );
                  }
                  // If the topic is unchecked, remove it from the filter
                  return prevFilters.map((f) =>
                    f.id === "Semester"
                      ? {
                          ...f,
                          value: (f.value as typeof SEMESTERS).filter(
                            (s: (typeof SEMESTERS)[number]) => s !== semester,
                          ),
                        }
                      : f,
                  );
                }

                // If a column filter for the topic column does not exist, create a new filter
                if (checked) {
                  return [
                    ...prevFilters,
                    { id: "Semester", value: [semester] },
                  ];
                }

                // If the topic is unchecked, return the previous filter
                return prevFilters;
              });
            }}
          >
            {semester}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={() =>
            setColumnFilters((prev) => prev.filter((f) => f.id !== "Semester"))
          }
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

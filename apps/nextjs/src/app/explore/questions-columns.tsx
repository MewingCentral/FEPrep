"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { RouterOutputs } from "@feprep/api";
import { CaretSortIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";

export const questionsColumns: ColumnDef<
  RouterOutputs["questions"]["all"][number]
>[] = [
  {
    accessorKey: "Id",
    accessorFn: (row) => row.id,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Title",
    accessorFn: (row) => row.title,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Topic",
    accessorFn: (row) => row.topic,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Topic <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "Semester",
    accessorFn: (row) => row.semester,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Semester <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "Difficulty",
    accessorFn: (row) => {
      if (row.easyVotes > row.mediumVotes && row.easyVotes > row.hardVotes) {
        return "Easy";
      } else if (
        row.mediumVotes > row.easyVotes &&
        row.mediumVotes > row.hardVotes
      ) {
        return "Medium";
      } else if (
        row.hardVotes > row.easyVotes &&
        row.hardVotes > row.mediumVotes
      ) {
        return "Hard";
      } else {
        return "Unknown";
      }
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "Points",
    accessorFn: (row) => row.points,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Points
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Average Score",
    accessorFn: (row) => row.averageScore,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Average Score
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Votes",
    accessorFn: (row) => row.easyVotes + row.mediumVotes + row.hardVotes,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Votes
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

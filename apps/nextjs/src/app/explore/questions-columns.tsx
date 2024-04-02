"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { RouterOutputs } from "@feprep/api";

export const questionsColumns: ColumnDef<
  RouterOutputs["questions"]["all"][number]
>[] = [
  {
    accessorKey: "Title",
    accessorFn: (row) =>
      row.title
        ? row.title
        : `${row.semester} ${row.section} Question ${row.questionNumber}`,
  },
  {
    accessorKey: "Topic",
    accessorFn: (row) => row.topic,
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
  },
  {
    accessorKey: "Points",
    accessorFn: (row) => row.points,
  },
  {
    accessorKey: "Average Score",
    accessorFn: (row) => row.averageScore,
  },
  {
    accessorKey: "Votes",
    accessorFn: (row) => row.easyVotes + row.mediumVotes + row.hardVotes,
  },
];

import type { ColumnDef } from "@tanstack/react-table";

import type { RouterOutputs } from "@feprep/api";

export const questionsColumns: ColumnDef<
  RouterOutputs["questions"]["all"][number]
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
];

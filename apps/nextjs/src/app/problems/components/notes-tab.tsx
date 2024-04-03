"use client";

import { Skeleton } from "@feprep/ui/skeleton";
import type { RouterOutputs } from "@feprep/api";
import { api } from "~/trpc/react";

export function NotesTab({
    data,
}: {
    data: RouterOutputs["questions"]["all"]; 
    // change to notes content from specific user
}

) {
    const getAllQuestions = api.questions.all.useQuery();
  
    // TODO: make this a lot nicer
    // if (getAllQuestions.isLoading) {
    //   return <Skeleton className="h-40 w-full" />;
    // }
  
    return (
        <div className="w-full h-40"> 
            <input className="w-full h-40 break-words" type="text" placeholder="Type here..." /> 
        </div>
    );
  }
  
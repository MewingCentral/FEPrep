"use client";

import { RocketIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";

import { useQuestion } from "./question-context";

export function QuestionToggleButton() {
  const { setPageNumber, pageNumber } = useQuestion();

  return (
    <Button
      variant="outline"
      className="w-9 px-0 md:w-auto md:px-4"
      onClick={() => {
        if (pageNumber === 1) {
          setPageNumber(2);
        } else {
          setPageNumber(1);
        }
      }}
    >
      <RocketIcon className="md:mr-2" />
      <span className="hidden md:flex">
        {pageNumber === 1 ? "Solution" : "Question"}
      </span>
    </Button>
  );
}

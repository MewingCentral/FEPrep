"use client";

import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

interface QuestionContextValues {
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

export const QuestionContext = createContext<QuestionContextValues | undefined>(
  undefined,
);

export function QuestionProvider({ children }: { children: React.ReactNode }) {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <QuestionContext.Provider value={{ pageNumber, setPageNumber }}>
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestion = () => {
  const context = QuestionContext;
  if (context === undefined) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }

  return useContext(context)!;
};

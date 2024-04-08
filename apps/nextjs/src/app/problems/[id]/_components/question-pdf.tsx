"use client";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { ScrollArea } from "@feprep/ui/scroll-area";

import { useQuestion } from "./question-context";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function QuestionPDF({ file }: { file: string }) {
  const { pageNumber } = useQuestion();

  return (
    <ScrollArea>
      <Document file={file}>
        <Page pageNumber={pageNumber} />
      </Document>
    </ScrollArea>
  );
}

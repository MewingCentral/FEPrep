"use client";

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function PDF({
  file,
  pageNumber = 1,
}: {
  file: string;
  pageNumber: number;
}) {
  return (
    <Document file={file}>
      <Page
        pageNumber={pageNumber}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
    </Document>
  );
}

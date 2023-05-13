import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export default function PDFViewer(props: any) {
  return (
    <Document
      className="pdf-container"
      file="/dilekce/D1.pdf"
      onLoadError={console.error}
    >
      <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} renderMode="svg" />
    </Document>
  );
}
